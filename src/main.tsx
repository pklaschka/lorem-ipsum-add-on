import React, { useEffect, useState } from "react";
import { getRuntime } from "./utils/utils";


export const App = () => {
  const [textType, setTextType] = useState("TBD");
  async function getTextType() {
    const runtime = await getRuntime();
    setTextType(await runtime.determineTextNodeType());
    // setTextType("Hello World");
  }
  
  useEffect(() => {}, []);
  return (
    <>
      <main>
        <h1>Hello Lorem Ipsum!</h1>
        <p>{textType}</p>
        <button onClick={getTextType}>Click me</button>
      </main>
    </>
  );
};
