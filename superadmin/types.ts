import type { FC } from 'react';
import type { Timestamp } from 'firebase/firestore';

export interface Academy {
  id: string; // Firestore document ID
  academyId: string; // e.g. AC0001
  name: string;
  adminUid: string;
  adminEmail: string;
  adminName?: string;
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

export type CurrentUser = {
  role: 'superadmin';
  data: {
    uid: string;
    email: string;
  };
}
