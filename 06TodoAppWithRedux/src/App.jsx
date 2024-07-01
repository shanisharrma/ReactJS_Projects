import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen bg-gray-700 text-gray-100 flex flex-col items-center p-6">
      <AddTodo />
      <div className="w-[680px]">
        <Todos />
      </div>
    </div>
  );
}

export default App;
