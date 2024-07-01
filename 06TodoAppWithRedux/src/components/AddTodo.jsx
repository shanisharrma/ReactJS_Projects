import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addTodo} from "../feature/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div className="">
      <form onSubmit={addTodoHandler}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="py-1 px-4 rounded outline-none focus:outline-none text-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-3 hover:bg-blue-600 rounded mx-2"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
