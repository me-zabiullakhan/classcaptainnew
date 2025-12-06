
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { NewAdmissionIcon } from './icons/NewAdmissionIcon';
import { StudentsListIcon } from './icons/StudentsListIcon';
import { BirthdayIcon } from './icons/BirthdayIcon';
import { IdCardIcon } from './icons/IdCardIcon';
import { RegistrationFormIcon } from './icons/RegistrationFormIcon';
import { InactiveStudentsIcon } from './icons/InactiveStudentsIcon';

interface StudentOptionsPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  isStaffView?: boolean;
  onShowDevPopup: (featureName: string) => void;
}

const studentOptions = [
  { name: 'New Admission', Icon: NewAdmissionIcon, key: 'new-admission' },
  { name: 'Active Students List', Icon: StudentsListIcon, key: 'active-list' },
  { name: 'Inactive Students List', Icon: InactiveStudentsIcon, key: 'inactive-list' },
  { name: 'Student\'s Birthday', Icon: BirthdayIcon, key: 'birthday' },
  { name: 'Student\'s ID Card', Icon: IdCardIcon, key: 'id-card' },
  { name: 'Registration Forms', Icon: RegistrationFormIcon, key: 'reg-forms' },
];

export function StudentOptionsPage({ onBack, onNavigate, isStaffView, onShowDevPopup }: StudentOptionsPageProps): React.ReactNode {
  const handleClick = (key: string) => {
    switch (key) {
      case 'new-admission':
        onNavigate('new-student');
        break;
      case 'active-list':
        onNavigate('active-students');
        break;
      case 'inactive-list':
        onNavigate('inactive-students');
        break;
      case 'birthday':
        onNavigate('birthday-list');
        break;
      case 'reg-forms':
        onNavigate('registration-form-list');
        break;
      default:
        onShowDevPopup("Student's ID Card");
        break;
    }
  };

  const visibleOptions = isStaffView
    ? studentOptions.filter(option => option.key !== 'new-admission')
    : studentOptions;

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">Student Options</h1>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {visibleOptions.map(({ name, Icon, key }) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className="w-full bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4 text-left"
            >
              <div className="w-10 h-10 text-indigo-500">
                <Icon />
              </div>
              <span className="text-lg font-medium text-indigo-800">{name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}