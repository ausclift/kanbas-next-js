import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [] as any[]
};

const questionsSlice = createSlice({
  name: "questionsReducer",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestionLocal: (state, action) => {
      state.questions.push(action.payload);
    },
    updateQuestionLocal: (state, action) => {
      const updated = action.payload;
      state.questions = state.questions.map((q) =>
        q._id === updated._id ? updated : q
      );
    },
    deleteQuestionLocal: (state, action) => {
      state.questions = state.questions.filter(
        (q) => q._id !== action.payload
      );
    }
  }
});

export const {
  setQuestions,
  addQuestionLocal,
  updateQuestionLocal,
  deleteQuestionLocal
} = questionsSlice.actions;

export default questionsSlice.reducer;
