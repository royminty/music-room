import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

const App = () => {
  return (
    <div className="center">
      <HomePage />
    </div>
  );
};

//render this component inside that id=app div in the html file 
const appDiv = document.getElementById('app');
const root = createRoot(appDiv);
root.render(<App />);
// const appDiv = document.getElementById("app");
// render(<App />, appDiv);