"use client";
import { Provider } from "react-redux";
import store from "../store";


import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
  return(
    <div>
      <Provider store={store}>
        <h2>Redux Examples</h2>

        <TodoList />
      </Provider>
    </div>
  );
};
