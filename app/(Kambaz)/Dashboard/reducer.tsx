import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [] as { _id: string; user: string; course: string }[]
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    addEnrollment: (state, { payload }) => {
      const alreadyEnrolled = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push(payload);
      }
    },
    removeEnrollment: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});
export const { setEnrollments, addEnrollment, removeEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;