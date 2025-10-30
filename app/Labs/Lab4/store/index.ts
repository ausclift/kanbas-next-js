import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../ReduxExamples/HelloRedux/reducer";
import counterReducer from "../ReduxExamples/CounterRedux/reducer";
import addReducer from "../ReduxExamples/AddRedux/reducer";
import todosReducer from "../ReduxExamples/todos/reducer";
const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  }
});

export default store;