export interface Course {
  id: number;
  name: string;
  description: string;
  maxStudents: number;
  diversityIndex: number;
  uniqueDomains: number;
  totalStudents: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  courseId: number;
}

export interface CourseSelectorProps {
  courses: Course[];
  selectedCourseId?: number;
  onSelect: (id: number) => void;
  isLoading?: boolean;
}

export interface StudentListProps {
  students: Student[];
  onDelete: (id: number) => void;
}

export interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    name: string;
    description: string;
    maxStudents: number;
  };
  onSave: (courseData: {
    name: string;
    description: string;
    maxStudents: number;
  }) => void;
  onCourseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (e: React.FormEvent) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}
