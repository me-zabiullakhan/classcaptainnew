
import React, { useState, useEffect } from 'react';
import type { FeatureItem, Academy, Staff, BatchAccessPermissions, DailySchedule, ScheduleItem } from '../../types';
import { FeatureIcon } from '../FeatureIcon';

import { StudentsIcon } from '../icons/StudentsIcon';
import { AttendanceIcon } from '../icons/AttendanceIcon';
import { FeesIcon } from '../icons/FeesIcon';
import { ExamsIcon } from '../icons/ExamsIcon';
import { NoticeIcon } from '../icons/NoticeIcon';
import { IncomeIcon } from '../icons/IncomeIcon';
import { TimetableIcon } from '../icons/TimetableIcon';
import { LeaveIcon } from '../icons/LeaveIcon';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { TodaySchedulePopup } from '../student/TodaySchedulePopup';

const permissionBasedFeatures: FeatureItem[] = [
  { name: 'Students', Icon: StudentsIcon, color: 'bg-blue-600' },
  { name: 'Attendance', Icon: AttendanceIcon, color: 'bg-purple-600' },
  { name: 'Class Schedule', Icon: TimetableIcon, color: 'bg-pink-500' },
  { name: 'Tuition Fees', Icon: FeesIcon, color: 'bg-emerald-500' },
  { name: 'Manage Exams', Icon: ExamsIcon, color: 'bg-lime-500' },
  { name: 'Leave Manager', Icon: LeaveIcon, color: 'bg-blue-500' },
];

const defaultFeatures: FeatureItem[] = [
    { name: 'My Attendance', Icon: AttendanceIcon, color: 'bg-sky-500' },
    { name: 'Notice Board', Icon: NoticeIcon, color: 'bg-cyan-600' },
    { name: 'Salary Details', Icon: IncomeIcon, color: 'bg-orange-500' },
];


interface StaffDashboardPageProps {
    onNavigate: (page: string) => void;
    academy: Academy;
    staff: Staff;
    onShowDevPopup: (featureName: string) => void;
    systemLogoUrl?: string | null;
}

export function StaffDashboardPage({ onNavigate, academy, staff, onShowDevPopup, systemLogoUrl }: StaffDashboardPageProps): React.ReactNode {
  const { batchAccess } = staff;

  const photoUrl = staff.photo || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(staff.name)}`;
  
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [todaysSchedule, setTodaysSchedule] = useState<ScheduleItem[] | null>(null);
  const [isScheduleLoading, setIsScheduleLoading] = useState(true);

  useEffect(() => {
    const fetchStaffSchedule = async () => {
        if (sessionStorage.getItem('staffDashboardPopupsShown') === 'true') {
            setIsScheduleLoading(false);
            return;
        }

        setIsScheduleLoading(true);
        const dateString = new Date().toISOString().split('T')[0];
        try {
            const scheduleRef = doc(db, `academies/${academy.id}/schedules`, dateString);
            const docSnap = await getDoc(scheduleRef);
            const staffClasses: ScheduleItem[] = [];

            if (docSnap.exists()) {
                const data = docSnap.data() as DailySchedule;
                for (const batchId in data) {
                    const batchSchedule = data[batchId];
                    batchSchedule.forEach(item => {
                        if (item.type === 'class' && item.teacherId === staff.id) {
                            staffClasses.push(item);
                        }
                    });
                }
            }
            staffClasses.sort((a, b) => a.startTime.localeCompare(b.startTime));
            setTodaysSchedule(staffClasses);
            setShowSchedulePopup(true);
            sessionStorage.setItem('staffDashboardPopupsShown', 'true');
        } catch (err) {
            console.error("Error fetching staff schedule:", err);
            setTodaysSchedule(null);
        } finally {
            setIsScheduleLoading(false);
        }
    };

    fetchStaffSchedule();
  }, [staff.id, academy.id]);


  const hasPermission = (perm: keyof BatchAccessPermissions) => {
    return Object.values(batchAccess || {}).some(p => p[perm]);
  }

  const availableFeatures = permissionBasedFeatures.filter(feature => {
      switch (feature.name) {
          case 'Students':
              return Object.keys(batchAccess || {}).length > 0;
          case 'Attendance':
              return hasPermission('attendance');
          case 'Class Schedule':
              return Object.keys(batchAccess || {}).length > 0;
          case 'Tuition Fees':
              return hasPermission('fees');
          case 'Manage Exams':
              return hasPermission('exams');
          case 'Leave Manager':
              return hasPermission('leaveRequests');
          default:
              return false;
      }
  });

  const allVisibleFeatures = [...availableFeatures, ...defaultFeatures];

  const getClickHandler = (name: string) => {
    switch (name) {
      case 'Students': return () => onNavigate('active-students');
      case 'Tuition Fees': return () => onNavigate('select-batch-for-fees');
      case 'Attendance': return () => onNavigate('select-batch-attendance');
      case 'Class Schedule': return () => onNavigate('class-schedule');
      case 'Manage Exams': return () => onNavigate('manage-exams');
      case 'Leave Manager': return () => onNavigate('leave-manager');
      case 'Notice Board': return () => onNavigate('staff-notice-board');
      case 'My Attendance': return () => onNavigate('staff-attendance');
      default: return () => onShowDevPopup(name);
    }
  }

  return (
    <>
        <main className="flex-grow p-4 space-y-4 overflow-y-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
                <img
                    src={photoUrl}
                    alt={staff.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 bg-gray-200"
                />
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{staff.name.toUpperCase()}</h3>
                    <p className="text-sm text-gray-600">{staff.staffId}</p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-3 sm:gap-x-4 text-center">
                    {allVisibleFeatures.map((feature) => (
                    <FeatureIcon
                        key={feature.name}
                        {...feature}
                        onClick={getClickHandler(feature.name)}
                    />
                    ))}
                </div>
            </div>
        </main>
        {showSchedulePopup && (
            <TodaySchedulePopup 
                schedule={todaysSchedule} 
                onClose={() => setShowSchedulePopup(false)} 
                isLoading={isScheduleLoading}
            />
        )}
    </>
  );
}
