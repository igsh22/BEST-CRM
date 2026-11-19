export type Priority = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'New' | 'In Progress' | 'Closed';
export type Role = 'Relationship Manager' | 'Manager' | 'Regional Manager' | 'Branch Manager';
export type Region = 'South' | 'East' | 'West' | 'North' | 'Center';
export type Language = 'BG' | 'EN';

export interface Interaction {
  id: string;
  type: 'Call' | 'Email' | 'Meeting';
  clientName: string;
  timestamp: string;
  description: string;
}

export interface LeadSource {
  source: 'External referral' | 'Employee referral' | 'Client referral' | 'Digital channel';
  count: number;
  stages: {
    new: number;
    inProgress: number;
    closed: number;
  };
}

export interface AITask {
  id: string;
  clientName: string;
  description: string;
  priority: Priority;
  suggestedAction: string;
  category: 'Campaign' | 'Lifecycle' | 'Behavioral';
  phone?: string;
  email?: string;
  isProspect?: boolean;
}

export interface Opportunity {
  id: string;
  product: string;
  status: TaskStatus;
  value: number;
}

export interface Case {
  id: string;
  type: 'Blocked card' | 'Complaint' | 'Service request';
  status: 'Open' | 'In Progress' | 'Closed';
  description: string;
}

export interface ProductSection {
  name: string;
  balance: number;
  details?: string;
  profit?: number;
  investedAmount?: number;
  accumulatedAmount?: number;
  revolvingLimit?: number;
  outstandingBalance?: number;
}

export interface ClientProducts {
  accounts: ProductSection[];
  cards: ProductSection[];
  investments: ProductSection[];
  loans: ProductSection[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  lifetimeValue: number;
  engagementScore: number;
  totalAssets: number;
  totalLiabilities: number;
  lastContactDate: string;
  opportunities: Opportunity[];
  cases: Case[];
  interactions: Interaction[];
  status: 'Customer' | 'Prospect';
  criticalInsight?: string;
  products?: ClientProducts;
}

export interface ProductPenetration {
  product: string;
  portfolio: number;
  bankAverage: number;
}

export interface UserProfile {
  name: string;
  role: Role;
  portfolioCode: string;
  region: Region;
  team?: string[];
}
