import type { CourseSelectorProps } from "../interfaces";

const CourseSelector: React.FC<CourseSelectorProps> = ({
    courses,
    selectedCourseId,
    onSelect,
    isLoading
}) => {
    return (
        <select
            value={selectedCourseId ?? ''}
            onChange={(e) => onSelect(Number(e.target.value))}
            disabled={isLoading}
            className="mt-2 block w-1/2 px-3 py-2 placeholder-gray-400 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
            <option value="" disabled>Selecciona un curso</option>
            {courses.map((course) => (
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>
            ))}
        </select>
    );
};

export default CourseSelector;
