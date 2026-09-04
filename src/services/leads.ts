import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import type { Lead, LeadStatus } from '../types/lead';

const LEADS_COLLECTION = 'leads';

export const createLead = async (leadData: Omit<Lead, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!leadData.fullName.trim()) throw new Error('Full name is required.');
  if (!leadData.email.trim()) throw new Error('Valid email address is required.');
  if (!leadData.mobile.trim()) throw new Error('Mobile number is required.');

  const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
    fullName: leadData.fullName.trim(),
    email: leadData.email.trim(),
    mobile: leadData.mobile.trim(),
    companyName: leadData.companyName?.trim() || '',
    website: leadData.website?.trim() || '',
    services: leadData.services || [],
    customService: leadData.customService?.trim() || '',
    budget: leadData.budget || 'Under ₹50K',
    goals: leadData.goals?.trim() || '',
    status: 'New' as LeadStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const subscribeToLeads = (callback: (leads: Lead[]) => void, onError?: (error: Error) => void) => {
  const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
  
  return onSnapshot(
    q,
    (snapshot) => {
      const leads: Lead[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          fullName: data.fullName || '',
          email: data.email || '',
          mobile: data.mobile || '',
          companyName: data.companyName || '',
          website: data.website || '',
          services: data.services || [],
          customService: data.customService || '',
          budget: data.budget || '',
          goals: data.goals || '',
          status: (data.status || 'New') as LeadStatus,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt ? data.updatedAt.toDate() : new Date(),
        };
      });
      callback(leads);
    },
    (err) => {
      console.error('Firestore leads listener error:', err);
      if (onError) onError(err);
    }
  );
};

export const updateLeadStatus = async (leadId: string, newStatus: LeadStatus): Promise<void> => {
  const leadRef = doc(db, LEADS_COLLECTION, leadId);
  await updateDoc(leadRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

export const deleteLead = async (leadId: string): Promise<void> => {
  const leadRef = doc(db, LEADS_COLLECTION, leadId);
  await deleteDoc(leadRef);
};
