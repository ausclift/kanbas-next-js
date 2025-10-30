import React from "react";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem>
      <FormControl
        className="mb-2"
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}/>
      <Button className="btn-success me-2"
              onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"> Add </Button>
      <Button className="btn-warning me-2"
              onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"> Update </Button>
    </ListGroupItem>
);}
