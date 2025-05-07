import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addStudent,
  deleteStudent,
  getStudents,
} from "../services/courseService";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => (await getStudents()).data,
  });
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
