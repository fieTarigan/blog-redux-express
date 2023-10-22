import React from "react";
import "./App.css";
import NavbarMenu from "./components/NavbarMenu";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <div className="w-full m-0 p-0 bg-slate-800 min-h-screen text-white">
        <NavbarMenu />
        <MainContent />
      </div>
    </>
  );
}

export default App;
