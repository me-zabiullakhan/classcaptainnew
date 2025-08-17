
import type { FC } from 'react';
import type { Timestamp } from 'firebase/firestore';

export interface FeatureItem {
  name: string;
  Icon: FC<{ className?: string }>;
  color: string;
}

export interface Academy {
  id: string; // Firestore document ID
  academyId: string; // e.g. AC0001
  name: string;
  adminUid: string;
  adminEmail: string;
  status?: 'active' | 'paused';
  contactEmail?: string;
  contactPhone?: string;
  contactPhoneAlt?: string;
  website?: string;
  address?: string;
}

export interface Batch {
  id: string; // Firestore document ID
  name:string;
  location: string;
  teacher: string;
  time: string;
  days: string[];
  maxSlots: number;
  currentStudents: number;
  batchFeeAmount?: number;
  batchFeeType?: 'Monthly' | 'Yearly';
}

export interface Student {
    id: string; // Firestore document ID
    rollNumber: string;
    name: string;
    fatherName: string;
    motherName: string;
    dob: string;
    mobile1: string;
    mobile2?: string;
    gender: 'Male' | 'Female' | 'Other';
    address: string;
    admissionDate: string;
    batches: string[]; // Array of batch names
    password?: string;
    transport: string;
    idNumber?: string;
    field1?: string;
    field2?: string;
    photo?: string; // a base64 string or URL
    feeType?: 'Monthly' | 'Yearly';
    feeAmount?: number;
    isActive: boolean;
}

export interface Teacher {
    id: string; // Firestore document ID
    teacherId: string; // Separate, user-facing ID for login
    name: string;
    dob: string;
    // ... other teacher properties
}

export type CurrentUser = {
  role: 'admin';
  data: Academy;
} | {
  role: 'student';
  data: Student;
  academyId: string;
} | {
  role: 'teacher';
  data: Teacher;
  academyId: string;
}


export type AttendanceStatus = 'Not Set' | 'Holiday' | 'Leave' | 'Present' | 'Absent';

export interface FeeCollection {
  id: string; // Firestore document ID
  studentId: string;
  studentName: string;
  studentRollNumber: string;
  batchNames: string[];
  paymentDate: Timestamp;
  feeForMonth: string; // e.g., "2024-08"
  totalAmount: number; // The original fee amount
  discount: number;
  amountPaid: number; // totalAmount - discount
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'Other';
  collectedBy?: string; // admin's email or ID
  createdAt: Timestamp;
}