import React, { useState, useMemo, type FormEvent, type ChangeEvent } from 'react';

import DiversityIndexGauge from '../components/DiversityIndexGauge';
import CourseModal from '../components/CourseModal';
import StudentModal from '../components/StudentModal';
import StudentList from '../components/StudentList';
import CourseActions from '../components/CourseActions';
import CourseSelector from '../components/CourseSelector';

interface Student {
    id: number;
    name: string;
    email: string;
    courseId: number;
}

interface Course {
    id: number;
    name: string;
    description: string;
    maxStudents: number;
    diversityIndex: number;
    uniqueDomains: number;
    totalStudents: number;
}

const CoursePage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        { id: 1, name: 'Juan Pérez', email: 'juan@gmail.com', courseId: 1 },
        { id: 2, name: 'Ana Gómez', email: 'ana@yahoo.com', courseId: 1 },
        { id: 3, name: 'Carlos Díaz', email: 'carlos@hotmail.com', courseId: 2 },
    ]);
    const [courses, setCourses] = useState<Course[]>([
        {
            id: 1,
            name: 'Curso de Desarrollo Web',
            description: 'Aprende a crear aplicaciones web modernas con React.',
            maxStudents: 30,
            diversityIndex: 65,
            uniqueDomains: 4,
            totalStudents: 10
        },
        {
            id: 2,
            name: 'Curso de Backend con Node.js',
            description: 'Aprende a crear aplicaciones backend con Node.js.',
            maxStudents: 25,
            diversityIndex: 60,
            uniqueDomains: 3,
            totalStudents: 12
        },
    ]);
    const [course, setCourse] = useState<Course>(courses[0]);
    const [isCourseModalOpen, setIsCourseModalOpen] = useState<boolean>(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>('');
    const [studentEmail, setStudentEmail] = useState<string>('');
    const [newCourse, setNewCourse] = useState<{ name: string; description: string; maxStudents: number }>({ name: '', description: '', maxStudents: 0 });
    const [editMode, setEditMode] = useState<boolean>(false);

    const studentList = useMemo(() => students.filter((student) => student.courseId === course.id), [students, course]);

    const handleAddStudent = (e: FormEvent) => {
        e.preventDefault();
        if (studentList.length >= course.maxStudents) {
            alert('Cupo máximo alcanzado para este curso');
            return;
        }
        const newStudent = {
            id: students.length + 1,
            name: studentName,
            email: studentEmail,
            courseId: course.id,
        };
        setStudents([...students, newStudent]);
        setStudentName('');
        setStudentEmail('');
        setIsStudentModalOpen(false);
    };

    const handleDeleteStudent = (id: number) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    const handleDeleteCourse = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            const updatedCourses = courses.filter((c) => c.id !== course.id);
            setCourses(updatedCourses);
            setCourse(updatedCourses.length > 0 ? updatedCourses[0] : { id: 0, name: '', description: '', maxStudents: 0, diversityIndex: 0, uniqueDomains: 0, totalStudents: 0 });
        }
    };

    const handleOpenCourseModal = (isEditMode: boolean) => {
        setEditMode(isEditMode);
        if (isEditMode) {
            setNewCourse({
                name: course.name,
                description: course.description,
                maxStudents: course.maxStudents,
            });
        } else {
            setNewCourse({ name: '', description: '', maxStudents: 0 });
        }
        setIsCourseModalOpen(true);
    };

    const handleSaveCourse = (courseData: { name: string; description: string; maxStudents: number }) => {
        if (editMode) {
            const updatedCourses = courses.map(c => (c.id === course.id ? { ...c, ...courseData } : c));
            setCourses(updatedCourses);
            setCourse(updatedCourses.find(c => c.id === course.id)!);
        } else {
            const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
            const newCourseObj: Course = {
                id: newId,
                diversityIndex: 0,
                uniqueDomains: 0,
                totalStudents: 0,
                ...courseData,
            };
            setCourses([...courses, newCourseObj]);
            setCourse(newCourseObj);
        }
        setIsCourseModalOpen(false);
    };

    const handleSelectCourse = (selectedCourseId: number) => {
        const selectedCourse = courses.find((c) => c.id === selectedCourseId);
        if (selectedCourse) {
            setCourse(selectedCourse);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="bg-white p-6 rounded-2xl pb-10 shadow-sm border space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="w-full">
                            <h1 className="text-3xl font-semibold">{course.name || 'Sin curso activo'}</h1>
                            <p className="text-gray-500">{course.description}</p>
                            <CourseSelector
                                courses={courses}
                                selectedCourseId={course.id}
                                onSelect={handleSelectCourse}
                            />
                        </div>
                        <CourseActions
                            onCreate={() => handleOpenCourseModal(false)}
                            onEdit={() => handleOpenCourseModal(true)}
                            onDelete={handleDeleteCourse}
                        />
                    </div>
                    <div className="text-sm text-gray-500">
                        Cupo máximo: {course.maxStudents}
                    </div>
                    <DiversityIndexGauge
                        diversityIndex={course.diversityIndex}
                        uniqueDomains={course.uniqueDomains}
                        totalStudents={course.totalStudents}
                    />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Estudiantes</h2>
                        <button
                            onClick={() => setIsStudentModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Agregar Estudiante
                        </button>
                    </div>
                    <StudentList students={studentList} onDelete={handleDeleteStudent} />
                </div>
            </div>

            <CourseModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
                course={newCourse}
                onSave={handleSaveCourse}
                onCourseChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const { name, value } = e.target;
                    setNewCourse({
                        ...newCourse,
                        [name]: name === 'maxStudents' ? Number(value) : value,
                    });
                }}
            />

            <StudentModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                studentName={studentName}
                studentEmail={studentEmail}
                onNameChange={(e) => setStudentName(e.target.value)}
                onEmailChange={(e) => setStudentEmail(e.target.value)}
                onSave={handleAddStudent}
            />
        </div>
    );
};

export default CoursePage;
