import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState: { enrollments: { _id: string; user: string; course: string }[] } = {
  enrollments: dbEnrollments as { _id: string; user: string; course: string }[],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: { payload: { user: string; course: string } }
    ) => {
      const alreadyEnrolled = state.enrollments.some(
        (enrollment) =>
          enrollment.user === payload.user && enrollment.course === payload.course
      );
      if (!alreadyEnrolled) {
        const newEnrollment = { _id: uuidv4(), user: payload.user, course: payload.course };
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    unenroll: (
      state,
      { payload }: { payload: { user: string; course: string } }
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === payload.user && enrollment.course === payload.course)
      );
    },
    clearEnrollments: (state) => {
      state.enrollments = [];
    },
  },
});
export const { enroll, unenroll, clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
