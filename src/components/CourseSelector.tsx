import React from 'react';

interface Course {
    id: number;
    name: string;
}

interface CourseSelectorProps {
    courses: Course[];
    selectedCourseId: number;
    onSelect: (id: number) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, selectedCourseId, onSelect }) => {
    return (
        <select
            onChange={(e) => onSelect(Number(e.target.value))}
            value={selectedCourseId || ''}
            className="px-2 py-1 text-sm rounded-md border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm hover:bg-blue-50 w-40 mt-2"
        >
            <option value="" disabled>
                Selecciona un curso
            </option>
            {courses.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>
    );
};

export default CourseSelector;
