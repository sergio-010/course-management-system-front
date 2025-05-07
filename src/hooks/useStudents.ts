import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  addStudent,
  deleteStudent,
  getStudents,
} from "../services/courseService";
import type { Student } from "../interfaces";

export const useStudents = () => {
  return useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: getStudents,
    placeholderData: [],
  });
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      toast.success("✅ Estudiante agregado correctamente");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error("Error agregando estudiante:", error);
      toast.error("❌ Error al agregar estudiante");
    },
    meta: { feature: "addStudent" },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast.success("✅ Estudiante eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error) => {
      console.error("Error eliminando estudiante:", error);
      toast.error("❌ Error al eliminar estudiante");
    },
    meta: { feature: "deleteStudent" },
  });
};
