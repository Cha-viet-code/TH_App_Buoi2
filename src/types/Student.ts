export interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Nam' | 'Nữ' | 'Khác';
  email: string;
  phone: string;
  className: string;
  faculty: string;
  gpa: number;
}