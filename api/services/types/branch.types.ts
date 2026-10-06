export type BranchStatus = 'active' | 'inactive';

export interface BranchAdminPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

export interface BranchPayload {
  name: string;
  slug: string;
  email: string;
  phone: string;
  address: string;
  status: BranchStatus;
  branch_admin: BranchAdminPayload;
}

export interface BranchUpdatePayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: BranchStatus;
}