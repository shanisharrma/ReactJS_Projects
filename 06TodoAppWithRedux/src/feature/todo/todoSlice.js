import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      id: 1,
      text: "Hello",
      completed: false,
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text !== undefined ? text : existingTodo.text;
      }
    },
    toggleComplete: (state, action) => {
      const { id, completed } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.completed =
          completed !== undefined ? completed : existingTodo.completed;
      }
      // state.todos = state.todos.map((todo) =>
      //   todo.id === action.payload
      //     ? { ...todo, completed: action.payload }
      //     : todo
      // );
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
