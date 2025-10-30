"use client";
import React from "react";
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./reducer";
export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button 
            className="btn-danger me-2"
            onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </Button>
      <Button
            className="me-2"
            onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </Button>
      {todo.title}
    </ListGroupItem>
);}

