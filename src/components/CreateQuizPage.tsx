
import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import type { Batch, Quiz, QuizQuestion, BatchAccessPermissions } from '../types';
import { CustomDropdown } from './CustomDropdown';
import { Timestamp } from 'firebase/firestore';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CreateQuizPageProps {
  onBack: () => void;
  onSave: (quizData: Omit<Quiz, 'id'>) => Promise<void>;
  batches: Batch[];
  quiz?: Quiz;
  staffPermissions?: Record<string, BatchAccessPermissions>;
}

const QuestionEditor: React.FC<{
    question: QuizQuestion;
    index: number;
    onUpdate: (id: string, field: 'questionText' | 'options' | 'correctAnswerIndex', value: any) => void;
    onRemove: (id: string) => void;
}> = ({ question, index, onUpdate, onRemove }) => {
    
    const handleOptionChange = (optionIndex: number, value: string) => {
        const newOptions = [...question.options];
        newOptions[optionIndex] = value;
        onUpdate(question.id, 'options', newOptions);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-700 dark:text-gray-200">Question {index + 1}</h4>
                <button type="button" onClick={() => onRemove(question.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40">
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
            <textarea
                placeholder="Enter question text..."
                value={question.questionText}
                onChange={(e) => onUpdate(question.id, 'questionText', e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 mb-3"
                rows={3}
            />
            <div className="space-y-2">
                {question.options.map((option, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={`correct-answer-${question.id}`}
                            checked={question.correctAnswerIndex === i}
                            onChange={() => onUpdate(question.id, 'correctAnswerIndex', i)}
                            className="form-radio text-indigo-600"
                        />
                        <input
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export function CreateQuizPage({ onBack, onSave, batches, quiz, staffPermissions }: CreateQuizPageProps) {
    const isEditMode = !!quiz;
    
    const [formData, setFormData] = useState({
        title: quiz?.title || '',
        batchId: quiz?.batchId || '',
        subject: quiz?.subject || '',
        date: quiz?.dateTime.toDate().toISOString().split('T')[0] || '',
        time: quiz?.dateTime.toDate().toTimeString().substring(0, 5) || '',
        duration: String(quiz?.duration || ''),
        totalMarks: String(quiz?.totalMarks || ''),
        instructions: quiz?.instructions || '',
    });
    const [questions, setQuestions] = useState<QuizQuestion[]>(quiz?.questions || []);
    const [isSaving, setIsSaving] = useState(false);

    const accessibleBatches = batches.filter(b => {
        if (!b.isActive) return false;
        if (!staffPermissions) return true; // Admin
        return !!staffPermissions[b.id]?.onlineQuiz;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddQuestion = () => {
        const newQuestion: QuizQuestion = {
            id: `${Date.now()}`,
            questionText: '',
            options: ['', '', '', ''],
            correctAnswerIndex: 0,
        };
        setQuestions(prev => [...prev, newQuestion]);
    };

    const handleRemoveQuestion = (id: string) => {
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const handleUpdateQuestion = (id: string, field: keyof QuizQuestion, value: any) => {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.batchId || !formData.date || !formData.time || !formData.title || !formData.subject || !formData.duration || !formData.totalMarks) {
            alert("Please fill all required fields.");
            return;
        }
        if (questions.length === 0) {
            alert("Please add at least one question.");
            return;
        }

        setIsSaving(true);
        try {
            const selectedBatch = batches.find(b => b.id === formData.batchId);
            const quizTimestamp = Timestamp.fromDate(new Date(`${formData.date}T${formData.time}`));

            await onSave({
                title: formData.title,
                batchId: formData.batchId,
                batchName: selectedBatch?.name || 'Unknown Batch',
                subject: formData.subject,
                dateTime: quizTimestamp,
                duration: Number(formData.duration),
                totalMarks: Number(formData.totalMarks),
                instructions: formData.instructions,
                questions,
                status: quiz?.status || 'Draft',
            });
        } catch (error) {
            alert((error as Error).message);
            setIsSaving(false);
        }
    };
    
    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">{isEditMode ? 'Edit Quiz' : 'Create New Quiz'}</h1>
            </header>
            
            <form onSubmit={handleSave} className="flex-grow flex flex-col">
                <main className="flex-grow p-4 overflow-y-auto space-y-4">
                    <input type="text" name="title" placeholder="Quiz Title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                    <CustomDropdown
                        label="Batch / Class"
                        options={accessibleBatches.map(b => ({ value: b.id, label: b.name }))}
                        selectedValue={formData.batchId}
                        onSelect={(value) => setFormData(p => ({ ...p, batchId: value }))}
                        placeholder="Select a batch"
                    />
                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" name="date" aria-label="Quiz Date" value={formData.date} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                        <input type="time" name="time" aria-label="Quiz Time" value={formData.time} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <input type="number" name="duration" placeholder="Duration (mins)" value={formData.duration} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                        <input type="number" name="totalMarks" placeholder="Total Marks" value={formData.totalMarks} onChange={handleChange} required className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg" />
                    </div>
                    <textarea name="instructions" placeholder="Instructions (Optional)" value={formData.instructions} onChange={handleChange} rows={3} className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"></textarea>
                
                    <div className="border-t pt-4 mt-4 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Questions</h3>
                        <div className="space-y-4">
                            {questions.map((q, i) => (
                                <QuestionEditor key={q.id} question={q} index={i} onUpdate={handleUpdateQuestion} onRemove={handleRemoveQuestion} />
                            ))}
                        </div>
                         <button type="button" onClick={handleAddQuestion} className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                            <PlusIcon className="w-5 h-5"/>
                            Add Question
                        </button>
                    </div>
                </main>
                <footer className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
                    <button type="submit" disabled={isSaving} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-md disabled:bg-indigo-300">
                        {isSaving ? 'Saving...' : (isEditMode ? 'Update Quiz' : 'Save Quiz')}
                    </button>
                </footer>
            </form>
        </div>
    );
}