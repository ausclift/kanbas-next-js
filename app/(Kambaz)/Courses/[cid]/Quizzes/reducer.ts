import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        course: quiz.course,
        available_date: quiz.available_date || new Date().toISOString(),
        due_date: quiz.due_date || new Date().toISOString(),
        points: quiz.points || 0,
        editing: false,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  setQuizzes,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
