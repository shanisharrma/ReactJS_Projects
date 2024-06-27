import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  //defining states to reflect on whole UI when it changes
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyMessage, setCopyMessage] = useState("Copy");

  //useRef Hook -> to use the reference of the field to demonstrate the use what have happened in the input field
  const passwordRef = useRef(null);

  // Using useCallback hook to optimize the code -> this will help us to re-render the UI when any of the dependency changes
  //Implementing the feature of password generation
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //Implementing the copy to clipboard feature
  const copyPasswordToClipboard = useCallback(() => {
    setCopyMessage("Copied");
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  //using useEffect Hook to re-render the UI and reflect the changes as per the changes occurred in dependencies
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-600 rounded-lg shadow-lg p-6 my-12">
        <h1 className="text-white text-2xl text-center mb-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-2 px-3"
            placeholder="Password"
            value={password}
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            {copyMessage}
          </button>
        </div>
        <div className="flex text-md text-white gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              id="rangeInput"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="rangeInput">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
