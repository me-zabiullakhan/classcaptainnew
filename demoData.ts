
import type { Batch, Student, Staff, Transaction, Enquiry, TransportRoute, StaffAttendance } from './types';
import { Timestamp } from 'firebase/firestore';

export const demoBatches: Batch[] = [
    {
        id: 'demo-batch-1',
        name: 'Morning Physics - Grade 12',
        location: 'Room 101',
        teacher: 'Dr. Evelyn Reed',
        time: '08:00',
        days: ['Mon', 'Wed', 'Fri'],
        maxSlots: 20,
        currentStudents: 3,
        batchFeeAmount: 500,
        batchFeeType: 'Monthly',
        isActive: true,
    },
    {
        id: 'demo-batch-2',
        name: 'Evening Maths - Grade 11',
        location: 'Room 203',
        teacher: 'Mr. Alan Grant',
        time: '17:30',
        days: ['Tue', 'Thu'],
        maxSlots: 15,
        currentStudents: 4,
        batchFeeAmount: 400,
        batchFeeType: 'Monthly',
        isActive: true,
    },
];

export const demoStudents: Student[] = [
    {
        id: 'demo-student-1',
        rollNumber: 'S001',
        name: 'Alice Johnson',
        fatherName: 'Robert Johnson',
        motherName: 'Mary Johnson',
        dob: '2006-05-15',
        mobile1: '9876543210',
        gender: 'Female',
        address: '123 Maple Street',
        admissionDate: '2023-04-01',
        batches: ['Morning Physics - Grade 12'],
        schoolOrCollege: 'Springfield High',
        transport: 'NO_TRANSPORT_USE',
        isActive: true,
        feeAmount: 500,
        feeType: 'Monthly',
    },
    {
        id: 'demo-student-2',
        rollNumber: 'S002',
        name: 'Bob Williams',
        fatherName: 'James Williams',
        motherName: 'Patricia Williams',
        dob: '2006-08-22',
        mobile1: '9876543211',
        gender: 'Male',
        address: '456 Oak Avenue',
        admissionDate: '2023-04-02',
        batches: ['Morning Physics - Grade 12', 'Evening Maths - Grade 11'],
        schoolOrCollege: 'Shelbyville High',
        transport: 'USE_TRANSPORT',
        transportRouteId: 'demo-route-1',
        transportFee: 800,
        isActive: true,
        feeAmount: 900,
        feeType: 'Monthly',
    },
    {
        id: 'demo-student-3',
        rollNumber: 'S003',
        name: 'Charlie Brown',
        fatherName: 'Charles Brown Sr.',
        motherName: 'Jennifer Brown',
        dob: '2007-02-10',
        mobile1: '9876543212',
        gender: 'Male',
        address: '789 Pine Lane',
        admissionDate: '2023-04-03',
        batches: ['Evening Maths - Grade 11'],
        schoolOrCollege: 'Demo Public School',
        transport: 'NO_TRANSPORT_USE',
        isActive: true,
        feeAmount: 400,
        feeType: 'Monthly',
    },
    {
        id: 'demo-student-4',
        rollNumber: 'S004',
        name: 'Diana Miller',
        fatherName: 'Michael Miller',
        motherName: 'Linda Miller',
        dob: '2006-11-30',
        mobile1: '9876543213',
        gender: 'Female',
        address: '101 Birch Road',
        admissionDate: '2023-04-05',
        batches: ['Morning Physics - Grade 12'],
        schoolOrCollege: 'Springfield High',
        transport: 'NO_TRANSPORT_USE',
        isActive: true,
        feeAmount: 500,
        feeType: 'Monthly',
    },
    {
        id: 'demo-student-5',
        rollNumber: 'S005',
        name: 'Ethan Davis',
        fatherName: 'David Davis',
        motherName: 'Susan Davis',
        dob: '2007-01-20',
        mobile1: '9876543214',
        gender: 'Male',
        address: '212 Cedar Street',
        admissionDate: '2023-04-06',
        batches: ['Evening Maths - Grade 11'],
        schoolOrCollege: 'Demo Public School',
        transport: 'USE_TRANSPORT',
        isActive: true,
        feeAmount: 400,
        feeType: 'Monthly',
    },
    {
        id: 'demo-student-6',
        rollNumber: 'S006',
        name: 'Fiona Garcia',
        fatherName: 'Richard Garcia',
        motherName: 'Karen Garcia',
        dob: '2007-03-12',
        mobile1: '9876543215',
        gender: 'Female',
        address: '333 Elm Drive',
        admissionDate: '2023-04-10',
        batches: ['Evening Maths - Grade 11'],
        schoolOrCollege: 'Shelbyville High',
        transport: 'NO_TRANSPORT_USE',
        isActive: true,
        feeAmount: 400,
        feeType: 'Monthly',
    },
];

export const demoStaff: Staff[] = [
    {
        id: 'demo-staff-1',
        staffId: 'T01',
        name: 'Alan Grant',
        dob: '1970-03-15',
        mobile: '9876543219',
        email: 'alangrant@example.com',
        gender: 'Male',
        address: 'Demo City, USA',
        joiningDate: '2022-09-01',
        photo: '',
        batchAccess: {
            'demo-batch-1': { attendance: true, editStudents: true },
            'demo-batch-2': { attendance: true, fees: true },
        },
        isActive: true,
    },
    {
        id: 'demo-staff-2',
        staffId: 'T02',
        name: 'Dr. Evelyn Reed',
        dob: '1982-11-22',
        mobile: '9876543221',
        email: 'evelynreed@example.com',
        gender: 'Female',
        address: 'Demo City, USA',
        joiningDate: '2021-08-15',
        photo: '',
        batchAccess: {
            'demo-batch-1': { attendance: true, exams: true },
        },
        isActive: true,
    }
];

export const demoStaffAttendance: StaffAttendance[] = [
    {
        id: 'demo-sa-1',
        staffId: 'demo-staff-2',
        staffName: 'Dr. Evelyn Reed',
        date: Timestamp.fromMillis(Date.now() - 86400 * 2 * 1000), // 2 days ago
        batchId: 'demo-batch-1',
        batchName: 'Morning Physics - Grade 12',
        subject: 'Physics',
        startTime: '08:00',
        endTime: '09:00',
        durationMinutes: 60,
    },
    {
        id: 'demo-sa-2',
        staffId: 'demo-staff-1',
        staffName: 'Alan Grant',
        date: Timestamp.fromMillis(Date.now() - 86400 * 1 * 1000), // yesterday
        batchId: 'demo-batch-2',
        batchName: 'Evening Maths - Grade 11',
        subject: 'Maths',
        startTime: '17:30',
        endTime: '19:00',
        durationMinutes: 90,
    }
];


export const demoTransactions: Transaction[] = [
    {
        id: 'demo-tx-1',
        type: 'Income',
        category: 'Stationery Sales',
        amount: 1500,
        paymentMethod: 'Cash',
        description: 'Sold 10 notebooks and 20 pens',
        date: Timestamp.fromMillis(Date.now() - 86400 * 5 * 1000), // 5 days ago
        createdAt: Timestamp.fromMillis(Date.now() - 86400 * 5 * 1000),
    },
    {
        id: 'demo-tx-2',
        type: 'Expense',
        category: 'Rent',
        amount: 10000,
        paymentMethod: 'Bank Transfer',
        description: 'Monthly rent for premises',
        date: Timestamp.fromMillis(Date.now() - 86400 * 2 * 1000), // 2 days ago
        createdAt: Timestamp.fromMillis(Date.now() - 86400 * 2 * 1000),
    },
    {
        id: 'demo-tx-3',
        type: 'Expense',
        category: 'Electricity Bill',
        amount: 2500,
        paymentMethod: 'UPI',
        description: 'Bill for last month',
        date: Timestamp.fromMillis(Date.now() - 86400 * 10 * 1000), // 10 days ago
        createdAt: Timestamp.fromMillis(Date.now() - 86400 * 10 * 1000),
    },
];

export const demoEnquiries: Enquiry[] = [
    {
        id: 'demo-enquiry-1',
        studentName: 'Laura Palmer',
        mobile: '5550101',
        interestedBatch: 'Morning Physics - Grade 12',
        referenceSource: 'Referral',
        followUpDate: Timestamp.fromMillis(Date.now() + 86400 * 2 * 1000), // 2 days from now
        status: 'New',
        createdAt: Timestamp.fromMillis(Date.now() - 86400 * 1 * 1000), // 1 day ago
    },
    {
        id: 'demo-enquiry-2',
        studentName: 'Dale Cooper',
        mobile: '5550102',
        email: 'coop@fbi.gov',
        interestedBatch: 'Evening Maths - Grade 11',
        referenceSource: 'Google',
        status: 'Follow-up',
        notes: 'Called once, needs a callback next week.',
        createdAt: Timestamp.fromMillis(Date.now() - 86400 * 5 * 1000), // 5 days ago
    }
];

export const demoTransportRoutes: TransportRoute[] = [
    {
        id: 'demo-route-1',
        routeName: 'City Center Route',
        vehicleNumber: 'KA-01-AB-1234',
        driverName: 'John Doe',
        driverContact: '9988776655',
        points: 'Main Square, Central Mall, Library Corner',
        monthlyFee: 80