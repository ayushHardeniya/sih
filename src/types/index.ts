// Student related types
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated';
}

// Admission types
export interface AdmissionApplication {
  id: string;
  studentId: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  program: string;
  documents: string[];
  remarks?: string;
}

// Fee types
export interface FeeStructure {
  id: string;
  program: string;
  semester: number;
  tuitionFee: number;
  hostelFee: number;
  miscFee: number;
  totalFee: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  method: 'cash' | 'card' | 'online' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed';
  receiptNumber: string;
}

// Hostel types
export interface HostelRoom {
  id: string;
  number: string;
  type: 'single' | 'double' | 'triple';
  capacity: number;
  occupancy: number;
  floor: number;
  building: string;
  amenities: string[];
}

export interface HostelAllocation {
  id: string;
  studentId: string;
  roomId: string;
  allocationDate: string;
  checkInDate?: string;
  checkOutDate?: string;
  status: 'allocated' | 'checked_in' | 'checked_out';
}

// Examination types
export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  program: string;
  semester: number;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  marks: number;
  maxMarks: number;
  grade: string;
  examType: 'mid_term' | 'final' | 'assignment' | 'quiz';
  examDate: string;
}

// Dashboard types
export interface DashboardStats {
  totalStudents: number;
  newAdmissions: number;
  pendingFees: number;
  occupiedRooms: number;
  availableRooms: number;
  upcomingExams: number;
}