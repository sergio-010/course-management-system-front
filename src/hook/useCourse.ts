import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateCourse,
  deleteCourse,
  getCourse,
} from "../services/courseService";

export const useCourse = () => {
  return useQuery({
    queryKey: ["course"],
    queryFn: async () => (await getCourse()).data,
  });
};

export const useCreateOrUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrUpdateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
};
