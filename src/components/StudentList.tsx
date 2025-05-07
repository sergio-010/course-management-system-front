import React from 'react';

interface Student {
    id: number;
    name: string;
    email: string;
}

interface StudentListProps {
    students: Student[];
    onDelete: (id: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
    return (
        <ul className="space-y-2">
            {students.map((student) => (
                <li
                    key={student.id}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                    <span>
                        {student.name} ({student.email})
                    </span>
                    <button
                        onClick={() => onDelete(student.id)}
                        className="text-red-500 hover:text-red-600 transition"
                    >
                        Eliminar
                    </button>
                </li>
            ))}
            {students.length === 0 && (
                <li className="text-gray-500">No hay estudiantes en este curso</li>
            )}
        </ul>
    );
};

export default StudentList;
