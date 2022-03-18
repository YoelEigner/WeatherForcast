import React, { useEffect } from "react"
import InternalRouter from "./Utils/InternalRouter";
import './App.css'
import { Theme } from "./Utils/Theam";

const App = () => {

  useEffect(() => {
    Theme.keepTheme();
  })
  return (
    <div className="App theme-dark">
      <InternalRouter />
    </div>
  );
};

export default App;




