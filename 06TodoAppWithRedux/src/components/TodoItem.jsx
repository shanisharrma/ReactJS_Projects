import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  removeTodo,
  updateTodo,
} from "../feature/todo/todoSlice";

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [text, setText] = useState(todo.text);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 my-4 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={() =>
          dispatch(toggleComplete({ id: todo.id, completed: !todo.completed }))
        }
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""} `}
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            dispatch(updateTodo({ id: todo.id, text }));
            setIsTodoEditable(false);
          } else setIsTodoEditable((prev) => !prev);
        }}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
