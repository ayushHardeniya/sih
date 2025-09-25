import { Student, AdmissionApplication, FeePayment, HostelRoom, HostelAllocation, Grade, DashboardStats } from '../types';

// Mock students data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@student.edu',
    phone: '+91-9876543210',
    address: '123 Main St, City, State',
    dateOfBirth: '2002-05-15',
    enrollmentDate: '2023-08-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@student.edu',
    phone: '+91-9876543211',
    address: '456 Oak Ave, City, State',
    dateOfBirth: '2001-12-10',
    enrollmentDate: '2022-08-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@student.edu',
    phone: '+91-9876543212',
    address: '789 Pine Rd, City, State',
    dateOfBirth: '2003-03-20',
    enrollmentDate: '2023-08-01',
    status: 'active'
  }
];

// Mock admission applications
export const mockAdmissions: AdmissionApplication[] = [
  {
    id: '1',
    studentId: '1',
    applicationDate: '2023-06-15',
    status: 'approved',
    program: 'Computer Science',
    documents: ['10th Certificate', '12th Certificate', 'Transfer Certificate'],
    remarks: 'All documents verified'
  },
  {
    id: '2',
    studentId: '4',
    applicationDate: '2023-07-20',
    status: 'pending',
    program: 'Mechanical Engineering',
    documents: ['10th Certificate', '12th Certificate'],
    remarks: 'Awaiting transfer certificate'
  }
];

// Mock fee payments
export const mockFeePayments: FeePayment[] = [
  {
    id: '1',
    studentId: '1',
    amount: 50000,
    paymentDate: '2023-08-15',
    method: 'online',
    status: 'completed',
    receiptNumber: 'RCP001'
  },
  {
    id: '2',
    studentId: '2',
    amount: 25000,
    paymentDate: '2023-08-10',
    method: 'bank_transfer',
    status: 'pending',
    receiptNumber: 'RCP002'
  }
];

// Mock hostel rooms
export const mockHostelRooms: HostelRoom[] = [
  {
    id: '1',
    number: '101',
    type: 'double',
    capacity: 2,
    occupancy: 2,
    floor: 1,
    building: 'Block A',
    amenities: ['WiFi', 'AC', 'Study Table']
  },
  {
    id: '2',
    number: '102',
    type: 'single',
    capacity: 1,
    occupancy: 0,
    floor: 1,
    building: 'Block A',
    amenities: ['WiFi', 'Fan', 'Study Table']
  },
  {
    id: '3',
    number: '103',
    type: 'triple',
    capacity: 3,
    occupancy: 1,
    floor: 1,
    building: 'Block A',
    amenities: ['WiFi', 'AC', 'Study Table', 'Balcony']
  }
];

// Mock hostel allocations
export const mockHostelAllocations: HostelAllocation[] = [
  {
    id: '1',
    studentId: '1',
    roomId: '1',
    allocationDate: '2023-08-01',
    checkInDate: '2023-08-05',
    status: 'checked_in'
  },
  {
    id: '2',
    studentId: '2',
    roomId: '1',
    allocationDate: '2023-08-01',
    checkInDate: '2023-08-05',
    status: 'checked_in'
  }
];

// Mock grades
export const mockGrades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    subjectId: '1',
    marks: 85,
    maxMarks: 100,
    grade: 'A',
    examType: 'mid_term',
    examDate: '2023-10-15'
  },
  {
    id: '2',
    studentId: '2',
    subjectId: '1',
    marks: 78,
    maxMarks: 100,
    grade: 'B+',
    examType: 'mid_term',
    examDate: '2023-10-15'
  }
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalStudents: 1250,
  newAdmissions: 45,
  pendingFees: 25,
  occupiedRooms: 450,
  availableRooms: 150,
  upcomingExams: 8
};