import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type, Part } from '@google/genai';
import { XMarkIcon } from './icons/XMarkIcon';
import { SendIcon, ChatbotIcon } from './icons/CentralIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import type { Student, FeeCollection, Batch, DailySchedule } from '../types';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface AIChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (page: string) => void;
    students: Student[];
    feeCollections: FeeCollection[];
    batches: Batch[];
    academyId: string;
}

type Message = {
    role: 'user' | 'model';
    parts: Part[];
};

// Add this type definition for cross-browser compatibility
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

// FIX: Define SpeechRecognitionErrorEvent as it is missing in the TypeScript environment.
interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
}

declare global {
    interface Window {
        SpeechRecognition: { new (): SpeechRecognition };
        webkitSpeechRecognition: { new (): SpeechRecognition };
    }
}


const getDuesData = (students: Student[], feeCollections: FeeCollection[]) => {
    const studentsWithDues: { student: Student; pendingMonths: string[] }[] = [];
    students.forEach(student => {
        if (!student.isActive || !student.admissionDate || !student.feeType) return;
        const paidMonths = new Set(feeCollections.filter(fc => fc.studentId === student.id).map(fc => fc.feeForMonth));
        const pendingMonths: string[] = [];
        const admissionDate = new Date(student.admissionDate);
        const today = new Date();

        if (student.feeType === 'Monthly') {
            let currentDate = new Date(admissionDate.getFullYear(), admissionDate.getMonth(), 1);
            while (currentDate <= today) {
                const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                if (!paidMonths.has(monthString)) pendingMonths.push(monthString);
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        }
        if (pendingMonths.length > 0) studentsWithDues.push({ student, pendingMonths });
    });
    return studentsWithDues;
};

const pageMap: { [key: string]: string } = {
    dashboard: 'dashboard',
    attendance: 'select-batch-attendance',
    fees: 'fees-options',
    students: 'student-options',
    batches: 'batches',
    reports: 'reports-options',
};

export function AIChatbot({ isOpen, onClose, onNavigate, students, feeCollections, batches, academyId }: AIChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { role: 'model', parts: [{ text: "Hello! I'm your AI assistant. How can I help you manage your academy today?" }] }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognitionAPI) {
            console.warn("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            sendMessage(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'not-allowed') {
                alert("Microphone access was denied. Please allow microphone access in your browser settings to use voice commands.");
            }
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
        
        recognitionRef.current = recognition;

    }, []);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    const tools: { functionDeclarations: FunctionDeclaration[] } = {
        functionDeclarations: [
            {
                name: 'navigateTo',
                description: 'Navigate to a specific page in the application.',
                parameters: {
                    type: Type.OBJECT, properties: {
                        page: { type: Type.STRING, description: 'The destination page. Can be one of: dashboard, attendance, fees, students, batches, reports.' }
                    }, required: ['page']
                }
            },
            {
                name: 'getFeeDuesCount',
                description: 'Get the total number of students who have not paid their fees.',
                parameters: { type: Type.OBJECT, properties: {} }
            },
            {
                name: 'checkScheduledClasses',
                description: 'Check if any classes are scheduled for today and for which batches.',
                parameters: { type: Type.OBJECT, properties: {} }
            }
        ]
    };
    
    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', parts: [{ text }] };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = [...messages, userMessage];
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { role: 'user', parts: [{ text }] },
                config: { tools: [tools] },
                history: history.slice(0, -1)
            });

            if (result.functionCalls && result.functionCalls.length > 0) {
                const fc = result.functionCalls[0];
                let functionResponse: any;

                if (fc.name === 'navigateTo') {
                    const page = fc.args.page as string;
                    const pageKey = pageMap[page.toLowerCase()];
                    if (pageKey) {
                        onNavigate(pageKey);
                        functionResponse = { success: true, message: `Navigating to ${page}.` };
                    } else {
                        functionResponse = { success: false, message: `Sorry, I can't navigate to a page called ${page}.` };
                    }
                } else if (fc.name === 'getFeeDuesCount') {
                    const duesData = getDuesData(students, feeCollections);
                    functionResponse = { count: duesData.length };
                } else if (fc.name === 'checkScheduledClasses') {
                    const dateString = new Date().toISOString().split('T')[0];
                    const scheduleRef = doc(db, `academies/${academyId}/schedules`, dateString);
                    const docSnap = await getDoc(scheduleRef);
                    if (docSnap.exists()) {
                        const scheduledBatchIds = Object.keys(docSnap.data());
                        const scheduledBatchNames = scheduledBatchIds
                            .map(id => batches.find(b => b.id === id)?.name)
                            .filter(Boolean);
                        functionResponse = { scheduled: true, batches: scheduledBatchNames };
                    } else {
                        functionResponse = { scheduled: false };
                    }
                }

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: {
                      role: 'user',
                      parts: [{functionResponse: {name: fc.name, response: functionResponse}}]
                    },
                    history: [...history, { role: 'model', parts: [{ functionCall: fc }] }],
                });
                
                setMessages(prev => [...prev, response]);
            } else {
                 setMessages(prev => [...prev, {role: 'model', parts: [{text: result.text}]}]);
            }

        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Sorry, I encountered an error. Please try again." }] }]);
        } finally {
            setIsLoading(false);
        }
    };


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const handleToggleListening = () => {
        if (isLoading) return;
        
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setInput('');
            recognitionRef.current?.start();
        }
        setIsListening(!isListening);
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-40 animate-fade-in">
            <header className="bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md flex-shrink-0">
                <div className="flex items-center gap-3">
                    <ChatbotIcon className="w-7 h-7" />
                    <h1 className="text-xl font-bold">AI Assistant</h1>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Close chatbot">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </header>
            
            <main ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}>
                                {msg.parts.map((part, i) => 'text' in part && <p key={i}>{part.text}</p>)}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                             <div className="max-w-xs px-4 py-3 rounded-2xl bg-white dark:bg-gray-700 rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></span>
                                </div>
                             </div>
                         </div>
                    )}
                </div>
            </main>
            
            <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0">
                <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Type or press mic to talk..."}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading || isListening}
                    />
                    {recognitionRef.current && (
                        <button 
                            type="button" 
                            onClick={handleToggleListening} 
                            disabled={isLoading}
                            className={`p-3 rounded-lg transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
                            aria-label={isListening ? 'Stop listening' : 'Start listening'}
                        >
                            <MicrophoneIcon className="w-6 h-6" />
                        </button>
                    )}
                    <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300">
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </footer>
        </div>
    );
}