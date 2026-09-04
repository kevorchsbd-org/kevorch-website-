 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import {
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


const LEADS_COLLECTION = 'leads';

export const createLead = async (leadData) => {
  if (!leadData.fullName.trim()) throw new Error('Full name is required.');
  if (!leadData.email.trim()) throw new Error('Valid email address is required.');
  if (!leadData.mobile.trim()) throw new Error('Mobile number is required.');

  const docRef = await addDoc(collection(db, LEADS_COLLECTION), {
    fullName: leadData.fullName.trim(),
    email: leadData.email.trim(),
    mobile: leadData.mobile.trim(),
    companyName: _optionalChain([leadData, 'access', _ => _.companyName, 'optionalAccess', _2 => _2.trim, 'call', _3 => _3()]) || '',
    website: _optionalChain([leadData, 'access', _4 => _4.website, 'optionalAccess', _5 => _5.trim, 'call', _6 => _6()]) || '',
    services: leadData.services || [],
    customService: _optionalChain([leadData, 'access', _7 => _7.customService, 'optionalAccess', _8 => _8.trim, 'call', _9 => _9()]) || '',
    budget: leadData.budget || 'Under ₹50K',
    goals: _optionalChain([leadData, 'access', _10 => _10.goals, 'optionalAccess', _11 => _11.trim, 'call', _12 => _12()]) || '',
    status: 'New' ,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

export const subscribeToLeads = (callback, onError) => {
  const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'));
  
  return onSnapshot(
    q,
    (snapshot) => {
      const leads = snapshot.docs.map((docSnap) => {
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
          status: (data.status || 'New') ,
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

export const updateLeadStatus = async (leadId, newStatus) => {
  const leadRef = doc(db, LEADS_COLLECTION, leadId);
  await updateDoc(leadRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

export const deleteLead = async (leadId) => {
  const leadRef = doc(db, LEADS_COLLECTION, leadId);
  await deleteDoc(leadRef);
};
