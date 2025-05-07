import React from 'react';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    studentEmail: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (e: React.FormEvent) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({
    isOpen,
    onClose,
    studentName,
    studentEmail,
    onNameChange,
    onEmailChange,
    onSave,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Agregar Estudiante</h2>
                <form onSubmit={onSave} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={studentName}
                            onChange={onNameChange}
                            className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Correo</label>
                        <input
                            type="email"
                            placeholder="Correo"
                            value={studentEmail}
                            onChange={onEmailChange}
                            className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentModal;
