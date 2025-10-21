

import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

// FIX: Refactored to use React.FC for better type inference with children.
const SettingsSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="text-sm font-bold uppercase text-indigo-600 dark:text-indigo-400 px-4 py-2 bg-gray-200/50 dark:bg-gray-900/50">{title}</h2>
        <div className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
            {children}
        </div>
    </div>
);

const SettingsItem = ({ title, subtitle, onClick }: { title: string, subtitle?: string, onClick?: () => void }) => (
  <button onClick={onClick} disabled={!onClick} className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex justify-between items-center disabled:hover:bg-transparent">
    <div>
      <p className="text-base text-gray-800 dark:text-gray-100">{title}</p>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
    {onClick && <ChevronRightIcon className="w-5 h-5 text-gray-400" />}
  </button>
);

const SettingsToggleItem = ({ title, subtitle, enabled, onToggle }: { title: string, subtitle?: string, enabled: boolean, onToggle: (enabled: boolean) => void }) => (
    <div className="p-4 flex justify-between items-center">
        <div>
            <p className="text-base text-gray-800 dark:text-gray-100">{title}</p>
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <button
            type="button"
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ${enabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            onClick={() => onToggle(!enabled)}
            aria-pressed={enabled}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
        </button>
    </div>
);

export function SettingsPage({ onBack, onNavigate, onShowDevPopup }: { onBack: () => void; onNavigate: (page: string) => void; onShowDevPopup: (feature: string) => void; }) {
    const [autoUpload, setAutoUpload] = React.useState(true);
    const [fingerprint, setFingerprint] = React.useState(false);

    return (
        <div className="animate-fade-in flex flex-col h-full bg-gray-100 dark:bg-gray-900">
            <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back to dashboard">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold ml-2">Settings</h1>
            </header>
            <main className="flex-grow overflow-y-auto">
                <div className="space-y-4 pt-4">
                    <SettingsSection title="General">
                        <SettingsItem title="Installments Preset" onClick={() => onShowDevPopup('Installments Preset')} />
                        <SettingsItem title="Add Signature" onClick={() => onShowDevPopup('Add Signature')} />
                        <SettingsItem title="ID Card Settings" onClick={() => onShowDevPopup('ID Card Settings')} />
                    </SettingsSection>
                    
                    <SettingsSection title="Communication">
                        <SettingsItem title="Message Setting" subtitle="Set custom SMS/WhatsApp messages" onClick={() => onNavigate('custom-sms-settings')} />
                        <SettingsItem title="Set Custom Message" onClick={() => onShowDevPopup('Set Custom Message')} />
                        <SettingsItem title="Dual Sim Settings" subtitle="Sim Slot 1" onClick={() => onShowDevPopup('Dual Sim Settings')} />
                        <SettingsItem title="WhatsApp Selection" subtitle="WhatsApp Business" onClick={() => onShowDevPopup('WhatsApp Selection')} />
                    </SettingsSection>
                    
                    <SettingsSection title="Configuration">
                        <SettingsItem title="Date Format" subtitle="dd-MM-yyyy" onClick={() => onShowDevPopup('Date Format')} />
                        <SettingsToggleItem title="Automatic Upload" subtitle="Live Database" enabled={autoUpload} onToggle={setAutoUpload} />
                        <SettingsToggleItem title="Fingerprint Enable" enabled={fingerprint} onToggle={setFingerprint} />
                    </SettingsSection>

                    <SettingsSection title="Other">
                        <SettingsItem title="Copyright" subtitle={`Copyright © ${new Date().getFullYear()} TCMS`} />
                        <SettingsItem title="Terms" onClick={() => onShowDevPopup('Terms')} />
                    </SettingsSection>
                </div>
            </main>
        </div>
    );
}