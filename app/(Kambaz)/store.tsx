import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import enrollmentsReducer from "./Dashboard/reducer"
import quizzesReducer from "./Courses/[cid]/Quizzes/reducer";
import questionsReducer from "./Courses/[cid]/Quizzes/[qid]/Editor/reducer";
const store = configureStore({
 reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    questionsReducer,
    },
});
export default store;