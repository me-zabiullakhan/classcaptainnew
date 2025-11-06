

import React, { useState } from 'react';
import type { Student, TransportRoute, Academy } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { MoreVertIcon } from './icons/MoreVertIcon';
import { LogoIcon } from './icons/LogoIcon';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LoadingSpinner } from './LoadingSpinner';


const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    // Input is YYYY-MM-DD
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    // Return DD/MM/YYYY
    return `${day}/${month}/${year}`;
};

const FormRow = ({ label, value }: { label: string, value?: string | number | null }) => (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200">
        <p className="text-sm text-gray-600 font-medium col-span-1">{label}</p>
        <p className="text-sm text-gray-800 col-span-2">{value || '-'}</p>
    </div>
);

export function RegistrationFormViewPage({ onBack, student, transportRoutes, academy }: { onBack: () => void; student: Student; transportRoutes: TransportRoute[]; academy: Academy }) {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExportPdf = async () => {
        setMenuOpen(false);
        const formElement = document.getElementById('registration-form');
        if (!formElement) return;

        setIsGenerating(true);

        try {
            const canvas = await html2canvas(formElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                width: formElement.scrollWidth,
                height: formElement.scrollHeight,
                windowWidth: formElement.scrollWidth,
                windowHeight: formElement.scrollHeight,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            if (Capacitor.isNativePlatform()) {
                // Native: Share via Filesystem
                const pdfData = pdf.output('datauristring').split(',')[1];
                const fileName = `registration-form-${student.name}.pdf`;

                const result = await Filesystem.writeFile({
                    path: fileName,
                    data: pdfData,
                    directory: Directory.Cache,
                });

                await Share.share({
                    title: `Registration Form - ${student.name}`,
                    text: `Here is the registration form for ${student.name}.`,
                    files: [result.uri],
                    dialogTitle: 'Share Registration Form',
                });
            } else {
                // Web fallback: download as PDF
                pdf.save(`registration-form-${student.name}.pdf`);
            }

        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Could not export the PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const assignedRoute = transportRoutes.find(r => r.id === student.transportRouteId);
    
    return (
        <>
        <div className="bg-slate-200 min-h-screen">
            <header className="no-print bg-indigo-700 text-white p-3 flex items-center justify-between shadow-md sticky top-0 z-10">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-indigo-800 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-bold ml-2">Registration Form</h1>
                </div>
                <div className="relative">
                     <button onClick={() => setMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-indigo-800">
                        <MoreVertIcon className="w-6 h-6" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <button onClick={handleExportPdf} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Export as PDF
                            </button>
                        </div>
                    )}
                </div>
            </header>
            
            <main className="p-2 sm:p-4 md:p-8">
                <div className="printable-form bg-white max-w-4xl mx-auto p-8 shadow-2xl font-sans" id="registration-form">
                    {/* Form Header */}
                    <div className="flex justify-between items-start pb-4 border-b-2 border-gray-500">
                        <div className="flex items-center space-x-4">
                             {academy.logoUrl ? (
                                <img src={academy.logoUrl} alt="Academy Logo" className="w-16 h-16 object-contain" />
                            ) : (
                                <LogoIcon className="w-16 h-16 text-indigo-600" />
                            )}
                            <div>
                                <h1 className="text-2xl font-extrabold text-gray-800 tracking-wider">{academy.name.toUpperCase()}</h1>
                                <p className="text-xs text-gray-500">Institute Management System</p>
                            </div>
                        </div>
                         <div className="text-right text-xs text-gray-600">
                            {academy.contactEmail && <p>{academy.contactEmail}</p>}
                            {academy.contactPhone && <p>{academy.contactPhone}</p>}
                            {academy.address && <p>{academy.address}</p>}
                        </div>
                    </div>
                    
                    <h2 className="text-center text-xl font-bold text-gray-700 my-6 underline underline-offset-4">STUDENT REGISTRATION FORM</h2>
                    
                    {/* Student Photo and Main Details */}
                    <div className="flex flex-col sm:flex-row gap-8 mb-8">
                        <div className="flex-grow space-y-2">
                             <FormRow label="Student Name" value={student.name} />
                             <FormRow label="Father's Name" value={student.fatherName} />
                             <FormRow label="Mother's Name" value={student.motherName} />
                             <FormRow label="Roll Number" value={student.rollNumber} />
                        </div>
                        <div className="w-32 h-40 border-2 border-gray-300 flex items-center justify-center text-gray-400 text-sm bg-gray-50 flex-shrink-0">
                            {student.photo ? <img src={student.photo} alt="Student" className="w-full h-full object-cover"/> : "Affix Photo"}
                        </div>
                    </div>
                    
                    {/* Personal & Contact Details */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Personal & Contact Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormRow label="Date of Birth" value={formatDate(student.dob)} />
                            <FormRow label="Gender" value={student.gender} />
                            <FormRow label="Mobile Number 1" value={student.mobile1} />
                            <FormRow label="Mobile Number 2" value={student.mobile2} />
                            <FormRow label="Address" value={student.address} />
                            <FormRow label="ID Number" value={student.idNumber} />
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2 border-b pb-1">Academic Details</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <FormRow label="Admission Date" value={formatDate(student.admissionDate)} />
                            <FormRow label="School/College" value={student.schoolOrCollege} />
                            <FormRow label="Enrolled Batches" value={student.batches.join(', ')} />
                            <FormRow label="Fee Type" value={student.feeType} />
                            <FormRow label="Fee Amount" value={`₹${student.feeAmount}`} />
                            <FormRow label="Transport" value={student.transport === 'USE_TRANSPORT' ? 'Opted In' : 'Not Opted'} />
                            <FormRow label="Transport Route" value={assignedRoute?.routeName} />
                         </div>
                    </div>

                    {/* Footer with Signatures */}
                    <div className="pt-16 mt-8 text-sm">
                        <div className="flex justify-between items-end">
                            <div className="text-center">
                                <div className="w-24 h-24 border-2 border-dashed border-gray-400 flex items-center justify-center">
                                    <p className="text-xs text-gray-500">Academy Seal</p>
                                </div>
                                <p className="mt-2 pt-2 border-t-2 border-gray-800 font-semibold">Authorised Signatory</p>
                            </div>
                            <div className="space-y-10">
                                <div className="text-center">
                                    <div className="w-48 h-10 border-b-2 border-gray-800"></div>
                                    <p className="mt-1 font-semibold">Parent/Guardian Signature</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-48 h-10 border-b-2 border-gray-800"></div>
                                    <p className="mt-1 font-semibold">Student Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        {isGenerating && (
            <div className="no-print fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <LoadingSpinner message="Generating PDF..." />
                </div>
            </div>
        )}
        </>
    );
}
