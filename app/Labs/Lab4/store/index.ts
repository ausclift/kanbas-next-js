import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../ReduxExamples/todos/reducer";
const store = configureStore({
  reducer: {

    todosReducer,
  }
});

export default store;