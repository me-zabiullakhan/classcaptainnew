
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { CheckIcon } from './icons/CheckIcon';

interface DropdownOption {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: DropdownOption[];
    selectedValue: string | null;
    onSelect: (value: string) => void;
    placeholder?: string;
    label?: string;
}

export function CustomDropdown({ options, selectedValue, onSelect, placeholder = "Select...", label }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const handleSelectOption = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && <label className="block text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">{label}</label>}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={`truncate ${selectedValue ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute z-[60] left-0 right-0 mt-1 w-full bg-white dark:bg-gray-800 shadow-xl rounded-md max-h-60 overflow-auto border border-gray-200 dark:border-gray-700 animate-fade-in-up"
                >
                    <ul role="listbox">
                        {options.length > 0 ? (
                            options.map(option => (
                                <li
                                    key={option.value}
                                    onClick={() => handleSelectOption(option.value)}
                                    className={`px-4 py-3 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-center ${selectedValue === option.value ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}
                                    role="option"
                                    aria-selected={selectedValue === option.value}
                                >
                                    <span>{option.label}</span>
                                    {selectedValue === option.value && (
                                        <CheckIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    )}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-gray-500 text-sm">No options available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
