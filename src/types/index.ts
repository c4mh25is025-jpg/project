export type Department = 
  | 'Executive'
  | 'Engineering'
  | 'Product & Design'
  | 'Global Operations'
  | 'Finance & Legal'
  | 'Sales & Marketing';

export type EmploymentType = 'Full-time' | 'Contractor' | 'Executive';

export type EmployeeStatus = 'Active' | 'On Leave' | 'Pending Review' | 'Inactive';

export interface ComplianceRecord {
  soc2Certified: boolean;
  securityAwareness: 'Completed' | 'Pending' | 'Expired';
  hipaaTrained: boolean;
  ndaSigned: boolean;
  ethicsPolicyDate: string;
  annualReviewScore: string; // e.g. "4.9 / 5.0"
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: Department;
  team: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  managerId: string | null;
  managerName: string | null;
  status: EmployeeStatus;
  employmentType: EmploymentType;
  hireDate: string;
  avatar: string;
  desk: string;
  salaryBand: string;
  compensationTier: string;
  skills: string[];
  compliance: ComplianceRecord;
  directReportsCount: number;
}

export type ViewMode = 'cards' | 'table' | 'org-chart' | 'compliance' | 'analytics';

export interface FilterState {
  searchQuery: string;
  department: string;
  location: string;
  status: string;
  employmentType: string;
  sortBy: 'name' | 'department' | 'title' | 'hireDate' | 'location';
  sortOrder: 'asc' | 'desc';
}
