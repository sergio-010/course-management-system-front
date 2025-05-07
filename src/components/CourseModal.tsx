import type { FC, FormEvent, ChangeEvent } from 'react';

interface CourseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (courseData: { name: string; description: string; maxStudents: number }) => void;
    course: {
        name: string;
        description: string;
        maxStudents: number;
    };
    onCourseChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CourseModal: FC<CourseModalProps> = ({
    isOpen,
    onClose,
    onSave,
    course,
    onCourseChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Curso</h2>
                <form
                    onSubmit={(e: FormEvent) => {
                        e.preventDefault();
                        onSave(course);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Nombre del Curso</label>
                        <input
                            type="text"
                            name="name"
                            value={course.name}
                            onChange={onCourseChange}
                            placeholder="Nombre del Curso"
                            className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Descripción</label>
                        <input
                            type="text"
                            name="description"
                            value={course.description}
                            onChange={onCourseChange}
                            placeholder="Descripción"
                            className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Cupo máximo</label>
                        <input
                            type="number"
                            name="maxStudents"
                            value={course.maxStudents}
                            onChange={onCourseChange}
                            placeholder="Cupo máximo"
                            className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition-colors"
                    >
                        Guardar Curso
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-100 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-200 transition-colors"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default CourseModal;
