import React from 'react';

interface CourseActionsProps {
    onCreate: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const CourseActions: React.FC<CourseActionsProps> = ({ onCreate, onEdit, onDelete }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={onCreate}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Crear Curso
            </button>
            <button
                onClick={onEdit}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
                Editar Curso
            </button>
            <button
                onClick={onDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
                Eliminar Curso
            </button>
        </div>
    );
};

export default CourseActions;
