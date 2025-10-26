import React, { useState, useMemo } from 'react';
import type { Task, Staff } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { XMarkIcon } from './icons/XMarkIcon';
import { CustomDropdown } from './CustomDropdown';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { FlagIcon } from './icons/FlagIcon';

const PRIORITY_LEVELS: Task['priority'][] = ['Low', 'Medium', 'High'];

interface TaskModalProps {
    onClose: () => void;
    onSave: (data: Omit<Task, 'id' | 'createdAt' | 'status'>, taskId?: string) => Promise<void>;
    staff: Staff[];
    taskToEdit?: Task | null;
    isDemoMode: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave, staff, taskToEdit, isDemoMode }) => {
    const isEditMode = !!taskToEdit;
    const [formData, setFormData] = useState({
        title: taskToEdit?.title || '',
        description: taskToEdit?.description || '',
        assignedToId: taskToEdit?.assignedToId || '',
        dueDate: taskToEdit?.dueDate.toDate().toISOString().split('T')[0] || '',
        priority: taskToEdit?.priority || 'Medium',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDemoMode) {
            alert("This is a demo. Data cannot be saved.");
            return;
        }
        if (!formData.title || !formData.dueDate) {
            alert("Title and Due Date are required.");
            return;
        }
        setIsSaving(true);
        const selectedStaff = staff.find(s => s.id === formData.assignedToId);
        try {
            await onSave({
                title: formData.title,
                description: formData.description,
                assignedToId: selectedStaff?.id,
                assignedToName: selectedStaff?.name,
                dueDate: formData.dueDate as any,
                priority: formData.priority as Task['priority'],
            }, taskToEdit?.id);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save task.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{isEditMode ? 'Edit Task' : 'New Task'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSave} className="flex-grow overflow-y-auto pr-2 space-y-4">
                    <input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    <textarea name="description" placeholder="Description (optional)" value={formData.description} onChange={handleChange} rows={4} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border rounded-lg" />
                    <CustomDropdown label="Priority" options={PRIORITY_LEVELS.map(p => ({ value: p, label: p }))} selectedValue={formData.priority} onSelect={val => setFormData(p => ({ ...p, priority: val }))} />
                    <CustomDropdown label="Assign To (Optional)" options={staff.map(s => ({ value: s.id, label: s.name }))} selectedValue={formData.assignedToId} onSelect={val => setFormData(p => ({ ...p, assignedToId: val }))} placeholder="Unassigned" />
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-600 font-bold">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-bold disabled:bg-indigo-300">{isSaving ? 'Saving...' : 'Save Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TaskCard: React.FC<{
    task: Task;
    onToggleStatus: (id: string, currentStatus: Task['status']) => void;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}> = ({ task, onToggleStatus, onEdit, onDelete }) => {
    const isOverdue = task.dueDate.toDate() < new Date() && task.status === 'Pending';
    const priorityColors = {
        High: 'border-red-500',
        Medium: 'border-yellow-500',
        Low: 'border-blue-500',
    };
    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 ${priorityColors[task.priority]}`}>
            <div className="flex items-start gap-4">
                <button onClick={() => onToggleStatus(task.id, task.status)} className={`w-6 h-6 rounded-md flex-shrink-0 mt-1 border-2 flex items-center justify-center ${task.status === 'Completed' ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {task.status === 'Completed' && <CheckIcon className="w-4 h-4 text-white" />}
                </button>
                <div className="flex-grow">
                    <p className={`font-semibold text-gray-800 dark:text-gray-100 ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                    {task.description && <p className={`text-sm text-gray-500 dark:text-gray-400 ${task.status === 'Completed' ? 'line-through' : ''}`}>{task.description}</p>}
                    <div className="text-xs mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>Due: {task.dueDate.toDate().toLocaleDateString()}</span>
                        {task.assignedToName && <span className="text-gray-500">To: {task.assignedToName}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button onClick={() => onEdit(task)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"><PencilIcon className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(task.id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

interface TodoTaskPageProps {
  onBack: () => void;
  tasks: Task[];
  staff: Staff[];
  onSaveTask: (data: Omit<Task, 'id' | 'createdAt' | 'status'>, taskId?: string) => Promise<void>;
  onToggleTaskStatus: (taskId: string, currentStatus: Task['status']) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  isDemoMode: boolean;
}

export function TodoTaskPage({ onBack, tasks, staff, onSaveTask, onToggleTaskStatus, onDeleteTask, isDemoMode }: TodoTaskPageProps) {
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [activeFilter, setActiveFilter] = useState<'Pending' | 'Completed'>('Pending');

    const filteredTasks = useMemo(() => tasks.filter(t => t.status === activeFilter).sort((a,b) => a.dueDate.toMillis() - b.dueDate.toMillis()), [tasks, activeFilter]);
    
    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    const handleAddNew = () => {
        setEditingTask(null);
        setShowModal(true);
    };

    return (
        <>
            <div className="animate-fade-in flex flex-col h-full">
                <header className="bg-indigo-700 text-white p-3 flex items-center shadow-md flex-shrink-0 sticky top-0 z-10">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">To-Do List</h1>
                </header>
                <div className="p-2 bg-white dark:bg-gray-800 shadow-sm flex-shrink-0">
                    <div className="flex justify-around bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                        <button onClick={() => setActiveFilter('Pending')} className={`w-full py-2 rounded-md font-semibold ${activeFilter === 'Pending' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Pending</button>
                        <button onClick={() => setActiveFilter('Completed')} className={`w-full py-2 rounded-md font-semibold ${activeFilter === 'Completed' ? 'bg-indigo-600 text-white' : 'dark:text-gray-300'}`}>Completed</button>
                    </div>
                </div>
                <main className="flex-grow p-4 overflow-y-auto">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No {activeFilter.toLowerCase()} tasks.</p>
                            {activeFilter === 'Pending' && <p className="text-gray-400 dark:text-gray-500">Click the <span className="font-bold text-indigo-500">+</span> button to add one.</p>}
                        </div>
                    ) : (
                        <div className="space-y-3 pb-20">
                            {filteredTasks.map(task => (
                                <TaskCard key={task.id} task={task} onToggleStatus={onToggleTaskStatus} onEdit={handleEdit} onDelete={onDeleteTask} />
                            ))}
                        </div>
                    )}
                </main>
                <button onClick={handleAddNew} className="absolute bottom-20 right-6 bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110" aria-label="Add New Task">
                    <PlusIcon className="w-8 h-8" />
                </button>
            </div>
            {showModal && <TaskModal onClose={() => setShowModal(false)} onSave={onSaveTask} staff={staff} taskToEdit={editingTask} isDemoMode={isDemoMode} />}
        </>
    );
}
