import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:8080");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(`this is from a socket from an welcome event:- ${s}`);
    });

    socket.emit("clientEvent", "Hello from the client");

    socket.on("broadcasting", (broad) => {
      console.log(`Broad casting ${broad}`);
    });
  }, []);
  return <></>;
}

export default App;
