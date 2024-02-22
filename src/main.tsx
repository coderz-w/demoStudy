import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StyleProvider } from "@ant-design/cssinjs";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
    <DndProvider backend={HTML5Backend}>
      <App />
      </DndProvider>
    </StyleProvider>
  </React.StrictMode>
);
