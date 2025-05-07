import React, { useState, useMemo, type FormEvent, type ChangeEvent } from 'react';

import DiversityIndexGauge from '../components/DiversityIndexGauge';
import CourseModal from '../components/CourseModal';
import StudentModal from '../components/StudentModal';
import StudentList from '../components/StudentList';
import CourseActions from '../components/CourseActions';
import CourseSelector from '../components/CourseSelector';

import { Toaster, toast } from 'sonner';

import type { Course, Student } from '../interfaces';

const CoursePage: React.FC = () => {
    // Estados locales para datos mock
    const [localCourses, setLocalCourses] = useState<Course[]>([
        {
            id: 1,
            name: 'Curso de Desarrollo Web',
            description: 'Aprende a crear aplicaciones web modernas',
            maxStudents: 10,
            diversityIndex: 65,
            uniqueDomains: 4,
            totalStudents: 10
        }
    ]);

    const [localStudents, setLocalStudents] = useState<Student[]>([
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com', courseId: 1 },
        { id: 2, name: 'María García', email: 'maria@example.com', courseId: 1 }
    ]);

    // Estados de UI
    const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        maxStudents: 0
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(1); // Seleccionamos el primer curso por defecto

    // Obtener curso seleccionado
    const course = localCourses.find(c => c.id === selectedCourseId) || null;

    // Filtrar estudiantes
    const studentList = useMemo(() => {
        if (!selectedCourseId) return [];
        return localStudents.filter((student) => student.courseId === selectedCourseId);
    }, [localStudents, selectedCourseId]);

    // Handlers
    const handleAddStudent = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedCourseId || studentList.length >= (course?.maxStudents || 0)) {
            toast.error('El curso ya ha alcanzado el número máximo de estudiantes');
            return;
        }

        const newStudent = {
            id: Math.max(0, ...localStudents.map(s => s.id)) + 1,
            name: studentName,
            email: studentEmail,
            courseId: selectedCourseId,
        };

        setLocalStudents([...localStudents, newStudent]);
        setStudentName('');
        setStudentEmail('');
        setIsStudentModalOpen(false);

        // Actualizar contador de estudiantes en el curso
        if (course) {
            setLocalCourses(localCourses.map(c =>
                c.id === selectedCourseId
                    ? { ...c, totalStudents: c.totalStudents + 1 }
                    : c
            ));
        }

        // Mostrar toast de éxito
        toast.success('Estudiante agregado exitosamente');
    };


    const handleDeleteStudent = (id: number) => {
        setLocalStudents(localStudents.filter(student => student.id !== id));

        if (course) {
            setLocalCourses(localCourses.map(c =>
                c.id === selectedCourseId
                    ? { ...c, totalStudents: Math.max(0, c.totalStudents - 1) }
                    : c
            ));
        }
        toast.success('Estudiante eliminado exitosamente');
    };

    const handleDeleteCourse = () => {
        if (!selectedCourseId) return;

        if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            const newCourses = localCourses.filter(c => c.id !== selectedCourseId);
            setLocalCourses(newCourses);
            setLocalStudents(localStudents.filter(s => s.courseId !== selectedCourseId));
            setSelectedCourseId(newCourses.length > 0 ? newCourses[0].id : null);
            toast.success('Curso eliminado exitosamente');
        }
    };


    const handleOpenCourseModal = (isEdit: boolean) => {
        setEditMode(isEdit);
        if (isEdit && course) {
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
        if (editMode && course) {
            setLocalCourses(localCourses.map(c =>
                c.id === course.id
                    ? { ...c, ...courseData }
                    : c
            ));
            toast.success('Curso actualizado exitosamente');
        } else {
            const newId = Math.max(0, ...localCourses.map(c => c.id)) + 1;
            const newCourse = {
                id: newId,
                ...courseData,
                diversityIndex: 50,
                uniqueDomains: 1,
                totalStudents: 0
            };
            setLocalCourses([...localCourses, newCourse]);
            setSelectedCourseId(newId);
            toast.success('Curso creado exitosamente');
        }
        setIsCourseModalOpen(false);
    };

    const handleSelectCourse = (courseId: number) => {
        setSelectedCourseId(courseId);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="bg-white p-6 rounded-2xl pb-10 shadow-sm border space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="w-full">
                            <h1 className="text-3xl font-semibold">
                                {course?.name || 'Selecciona un curso'}
                            </h1>
                            <p className="text-gray-500">{course?.description}</p>
                            <CourseSelector
                                courses={localCourses}
                                selectedCourseId={selectedCourseId ?? undefined}
                                onSelect={handleSelectCourse}
                            />
                        </div>
                        {course && (
                            <CourseActions
                                onCreate={() => handleOpenCourseModal(false)}
                                onEdit={() => handleOpenCourseModal(true)}
                                onDelete={handleDeleteCourse}
                            />
                        )}
                    </div>
                    {course && (
                        <>
                            <div className="text-sm text-gray-500">
                                Cupo máximo: {course.maxStudents}
                            </div>
                            <DiversityIndexGauge
                                diversityIndex={course.diversityIndex}
                                uniqueDomains={course.uniqueDomains}
                                totalStudents={course.totalStudents}
                            />
                        </>
                    )}
                </div>

                {selectedCourseId && (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Estudiantes</h2>
                            <button
                                onClick={() => setIsStudentModalOpen(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                disabled={studentList.length >= (course?.maxStudents || 0)}
                            >
                                Agregar Estudiante
                            </button>
                            {studentList.length >= (course?.maxStudents || 0) && (
                                <p className="text-red-500 text-sm mt-2">El curso ya ha alcanzado el número máximo de estudiantes.</p>
                            )}
                        </div>
                        <StudentList
                            students={studentList}
                            onDelete={handleDeleteStudent}
                        />
                    </div>
                )}
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
                isEditing={editMode}
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
            <Toaster richColors position="top-right" />
        </div>
    );
};

export default CoursePage;
