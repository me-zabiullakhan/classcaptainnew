

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
  logoUrl?: string;
  createdAt?: Timestamp;
  subscriptionStatus?: 'trialing' | 'active' | 'expired' | 'cancelled';
  trialEndsAt?: Timestamp;
  subscriptionEndsAt?: Timestamp;
  plan?: 'monthly' | 'quarterly' | 'yearly';
  smsTemplates?: Record<string, string>;
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
  isActive: boolean;
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
    email?: string;
    gender: 'Male' | 'Female' | 'Other';
    address: string;
    admissionDate: string;
    batches: string[]; // Array of batch names
    schoolOrCollege?: string;
    transport: string;
    idNumber?: string;
    field1?: string;
    field2?: string;
    photo?: string; // a base64 string or URL
    feeType?: 'Monthly' | 'Yearly';
    feeAmount?: number;
    isActive: boolean;
}

export interface BatchAccessPermissions {
  attendance?: boolean;
  editStudents?: boolean;
  exams?: boolean;
  fees?: boolean;
  studyMaterial?: boolean;
  homework?: boolean;
  onlineQuiz?: boolean;
  schedule?: boolean; // Can view/manage schedule for this batch
}

export interface Staff {
    id: string; // Firestore document ID
    staffId: string; // Separate, user-facing ID for login
    name: string;
    dob: string;
    mobile: string;
    email?: string;
    gender: 'Male' | 'Female' | 'Other';
    address: string;
    joiningDate: string;
    photo?: string; // a base64 string or URL
    batchAccess: Record<string, BatchAccessPermissions>;
    isActive: boolean;
}

export type CurrentUser = {
  role: 'admin';
  data: Academy;
} | {
  role: 'student';
  data: Student;
  academyId: string;
  academyName: string;
} | {
  role: 'staff';
  data: Staff;
  academyId: string;
  academyName: string;
} | {
  role: 'superadmin';
  data: {
    uid: string;
    email: string;
  };
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
  transactionId?: string; // ID of the corresponding transaction
}

export interface ClassScheduleItem {
  type: 'class';
  id: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  startTime: string;
  endTime: string;
}

export interface BreakScheduleItem {
  type: 'break';
  id: string;
  breakType: 'Short Break' | 'Lunch Break' | 'Other';
  startTime: string;
  endTime: string;
}

export type ScheduleItem = ClassScheduleItem | BreakScheduleItem;

// Document ID will be 'YYYY-MM-DD'
// Content will be key-value pairs of batchId: ScheduleItem[]
export interface DailySchedule {
  [batchId: string]: ScheduleItem[];
}

export interface Transaction {
  id: string; // Firestore document ID
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  paymentMethod: 'Cash' | 'UPI' | 'Bank Transfer' | 'Card' | 'Other';
  description: string;
  date: Timestamp;
  attachmentUrl?: string;
  createdAt: Timestamp;
  feeCollectionId?: string; // ID of the corresponding fee collection
}

export interface Exam {
  id: string; // Firestore document ID
  name: string;
  batchId: string;
  batchName: string;
  subject: string;
  date: Timestamp;
  maxMarks: number;
  passingMarks: number;
  description?: string;
  resultStatus: 'Draft' | 'Published';
}

export interface ExamMarks {
  // Document ID will be studentId
  studentId: string;
  studentName: string;
  studentRollNumber: string;
  marksObtained: number | null; // null if not yet entered
  status: 'Passed' | 'Failed' | 'Absent' | 'Not Graded';
}

export type EnquiryStatus = 'New' | 'Follow-up' | 'Converted' | 'Lost';
export type ReferenceSource = 'Google' | 'Referral' | 'Walk-in' | 'Social Media' | 'Other';

export interface Enquiry {
  id: string; // Firestore document ID
  studentName: string;
  mobile: string;
  email?: string;
  interestedBatch: string; // Batch name
  referenceSource: ReferenceSource;
  followUpDate?: Timestamp;
  notes?: string;
  status: EnquiryStatus;
  createdAt: Timestamp;
}

export interface StudyMaterial {
  id: string; // Firestore document ID
  title: string;
  description?: string;
  batchId: string;
  batchName: string;
  subject: string;
  fileType: 'file' | 'link';
  fileUrl: string; // Download URL from Storage or external link
  fileName?: string; // Original file name
  storagePath?: string; // Path in Firebase Storage to find for deletion
  uploadedAt: Timestamp;
  uploadedBy: string; // UID or name of uploader
}

export interface Homework {
  id: string; // Firestore document ID
  batchId: string;
  batchName: string;
  subject: string;
  title: string;
  description?: string;
  dueDate: Timestamp;
  attachmentUrl?: string;
  attachmentName?: string;
  storagePath?: string;
  assignedAt: Timestamp;
  assignedBy: string; // Name of uploader
}

export interface HomeworkSubmission {
    id: string; // studentId
    studentId: string;
    studentName: string;
    studentRollNumber: string;
    submittedAt: Timestamp;
    fileUrl: string; // URL of the student's submission
    fileName?: string;
    storagePath: string;
    status: 'Submitted' | 'Checked';
    remarks?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[]; // Should always have 4 elements
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string; // Firestore document ID
  title: string;
  batchId: string;
  batchName: string;
  subject: string;
  dateTime: Timestamp;
  duration: number; // in minutes
  totalMarks: number;
  instructions?: string;
  questions: QuizQuestion[];
  status: 'Draft' | 'Published' | 'Completed';
}

export interface QuizSubmission {
  id: string; // studentId
  studentId: string;
  studentName: string;
  studentRollNumber: string;
  answers: Record<string, number>; // question.id -> selected option index
  score: number;
  totalMarks: number;
  submittedAt: Timestamp;
}