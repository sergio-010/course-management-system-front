import axiosInstance from "./axiosInstance";
import type { Course, Student } from "../interfaces";

// Funciones relacionadas con el curso
export const getCourse = () => axiosInstance.get<Course>("/course");
export const createOrUpdateCourse = (data: Partial<Course>) =>
  axiosInstance.post<Course>("/course", data);
export const deleteCourse = () => axiosInstance.delete<void>("/course");

// Funciones relacionadas con los estudiantes
export const getStudents = () => axiosInstance.get<Student[]>("/students");
export const addStudent = (data: Partial<Student>) =>
  axiosInstance.post<Student>("/students", data);
export const deleteStudent = (id: number) =>
  axiosInstance.delete<void>(`/students/${id}`);
