export type PolicyStatus = 'Active' | 'Pending' | 'Lapsed';

export interface Policy {
  id: string;
  policyNumber: string;
  holderName: string;
  status: PolicyStatus;
  lastUpdated: string;
}