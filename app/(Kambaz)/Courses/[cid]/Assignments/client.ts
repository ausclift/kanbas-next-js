import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};
export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return data;
};
export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};
