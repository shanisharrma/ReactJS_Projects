import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

function Todo() {
  const todos = useSelector((state) => state.todos);

  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  );
}

export default Todo;
