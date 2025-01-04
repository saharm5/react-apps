// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import 'bootstrap/dist/css/bootstrap.css'
// import "@syncfusion/ej2-layouts/styles/material.css";
// import "bootstrap/dist/css/bootstrap.min.css";


// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}