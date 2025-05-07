import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createOrUpdateCourse,
  deleteCourse,
  getCourse,
  getCourses,
} from "../services/courseService";
import type { Course } from "../interfaces";

export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getCourses,
    placeholderData: [],
  });
};

export const useCourse = (courseId?: number) => {
  return useQuery<Course | null>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      return await getCourse(courseId);
    },
    enabled: !!courseId,
    placeholderData: null,
  });
};

export const useCreateOrUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrUpdateCourse,
    onSuccess: () => {
      toast.success("✅ Curso guardado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error creando o actualizando curso:", error);
      toast.error("❌ Error al guardar el curso");
    },
    meta: { feature: "createOrUpdateCourse" },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("✅ Curso eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error eliminando curso:", error);
      toast.error("❌ Error al eliminar el curso");
    },
    meta: { feature: "deleteCourse" },
  });
};
