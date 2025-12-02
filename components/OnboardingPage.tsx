
import React, { useState, useEffect } from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { StudentsIcon } from './icons/StudentsIcon';
import { AttendanceIcon } from './icons/AttendanceIcon';
import { FeesIcon } from './icons/FeesIcon';
import { ReportsIcon } from './icons/ReportsIcon';

interface OnboardingPageProps {
    onComplete: () => void;
}

const slides = [
    {
        id: 1,
        title: "Welcome to Class Captain",
        description: "The ultimate institute management solution designed to streamline your daily operations and boost productivity.",
        icon: <LogoIcon className="w-32 h-32 text-indigo-600 animate-pulse" />,
        color: "bg-indigo-50 dark:bg-gray-800"
    },
    {
        id: 2,
        title: "Smart Management",
        description: "Effortlessly organize students, batches, and staff in one centralized platform. Access data anytime, anywhere.",
        icon: <StudentsIcon className="w-24 h-24 text-blue-500" />,
        color: "bg-blue-50 dark:bg-gray-800"
    },
    {
        id: 3,
        title: "Automated Operations",
        description: "Track attendance, manage fee collections, and generate receipts automatically. Say goodbye to manual paperwork.",
        icon: <FeesIcon className="w-24 h-24 text-green-500" />,
        color: "bg-green-50 dark:bg-gray-800"
    },
    {
        id: 4,
        title: "Actionable Insights",
        description: "Gain valuable insights with detailed reports on performance, finance, and growth to make informed decisions.",
        icon: <ReportsIcon className="w-24 h-24 text-orange-500" />,
        color: "bg-orange-50 dark:bg-gray-800"
    }
];

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentSlide(prev => prev + 1);
                setIsAnimating(false);
            }, 300);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    const slide = slides[currentSlide];

    return (
        <div className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${slide.color}`}>
            {/* Top Navigation */}
            <div className="flex justify-end p-6">
                <button 
                    onClick={handleSkip}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors z-10"
                >
                    Skip
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-lg mx-auto w-full">
                {/* Image/Icon Container with Animation */}
                <div 
                    key={`icon-${slide.id}`}
                    className={`mb-10 transform transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 scale-95 translate-x-10' : 'opacity-100 scale-100 translate-x-0'}`}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/50 dark:bg-white/5 rounded-full blur-3xl transform scale-150"></div>
                        <div className="relative bg-white dark:bg-gray-700 p-8 rounded-full shadow-xl ring-4 ring-white/50 dark:ring-gray-600/50">
                            {slide.icon}
                        </div>
                    </div>
                </div>

                {/* Text Content with Animation */}
                <div 
                    key={`text-${slide.id}`}
                    className={`space-y-4 transform transition-all duration-500 ease-out delay-100 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        {slide.title}
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {slide.description}
                    </p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-6 md:p-10 w-full max-w-lg mx-auto">
                <div className="flex items-center justify-between">
                    {/* Pagination Dots */}
                    <div className="flex space-x-2">
                        {slides.map((_, index) => (
                            <div 
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentSlide 
                                        ? 'w-8 bg-indigo-600 dark:bg-indigo-400' 
                                        : 'w-2 bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Next/Get Started Button */}
                    <button
                        onClick={handleNext}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transform transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
