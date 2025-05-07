import axiosInstance from "./axiosInstance";
import type { Course, Student } from "../interfaces";

// Funciones de cursos
export const createOrUpdateCourse = async (data: Partial<Course>) => {
  const response = await axiosInstance.post<Course>("/courses", data);
  return response.data;
};

export const getCourse = async (id: number) => {
  const response = await axiosInstance.get<Course>(`/courses/${id}`);
  return response.data;
};

export const getCourses = async () => {
  const response = await axiosInstance.get<Course[]>("/courses");
  return response.data;
};

export const deleteCourse = async (id: number) => {
  await axiosInstance.delete(`/courses/${id}`);
};

// courseService.ts
export const getStudents = async (): Promise<Student[]> => {
  const response = await axiosInstance.get<Student[]>("/students");
  return response.data;
};

export const addStudent = async (
  data: Omit<Student, "id">
): Promise<Student> => {
  const response = await axiosInstance.post<Student>("/students", data);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/students/${id}`);
};
