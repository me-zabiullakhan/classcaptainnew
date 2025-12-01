import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface IntroductionPageProps {
  onComplete: () => void;
}

export const IntroductionPage: React.FC<IntroductionPageProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 text-center">
      <div className="animate-fade-in-up">
        <LogoIcon className="h-24 w-24 text-indigo-600 dark:text-indigo-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Welcome to ClassCaptain
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          The all-in-one solution to manage your academy. Streamline administrative tasks, manage students and staff, and enhance communication.
        </p>
        <button
          onClick={onComplete}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center group text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started
          <ArrowRightIcon className="h-6 w-6 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
