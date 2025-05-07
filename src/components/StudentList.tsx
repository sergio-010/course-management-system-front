import type { StudentListProps } from '../interfaces';

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
    return (
        <div className="space-y-2">
            {students.length === 0 ? (
                <p className="text-gray-500">No hay estudiantes inscritos</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {students.map((student) => (
                        <li key={student.id} className="py-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">{student.name}</h3>
                                <p className="text-gray-500">{student.email}</p>
                            </div>
                            <button
                                onClick={() => onDelete(student.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StudentList;