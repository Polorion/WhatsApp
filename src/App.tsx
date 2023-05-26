import React from "react";
import "./App.css";
import Authentification from "./components/authentification/Authentification";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./components/chatPage/ChatPage";

function App() {
  return (
    <div className="App">
      <div className={"container"}>
        <Routes>
          <Route path={"/"} element={<Authentification />} />
          <Route path={"/chat"} element={<ChatPage />} />
          <Route path={"*"} element={<div>страница не найдена</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
