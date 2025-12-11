import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};
export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};
export const deleteQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
  return data;
};
export const updateQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};
export const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`);
  return data;
};
export const createQuestionForQuiz = async (courseId: string, quizId: string, question: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions`, question);
  return data;
};
export const deleteQuestion = async (courseId: string, quizId: string, questionId: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`);
  return data;
};
export const updateQuestion = async (courseId: string, quizId: string, question: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${question._id}`,
    question
  );
  return data;
};