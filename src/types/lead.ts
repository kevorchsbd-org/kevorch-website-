export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export interface Lead {
  id?: string;
  fullName: string;
  email: string;
  mobile: string;
  companyName?: string;
  website?: string;
  services: string[];
  customService?: string;
  budget: string;
  goals: string;
  status: LeadStatus;
  isRead?: boolean;
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
}

