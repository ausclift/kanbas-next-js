import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  enrollments: dbEnrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { user, course } }) => {
      const alreadyEnrolled = state.enrollments.some(
        (enrollment: any) => enrollment.user === user && enrollment.course === course
      );
      if (!alreadyEnrolled) {
        const newEnrollment = { _id: uuidv4(), user, course };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
      }
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === user && enrollment.course === course)
      ) as any;
    },

    clearEnrollments: (state) => {
      state.enrollments = [];
    },
  },
});
export const { enroll, unenroll, clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
