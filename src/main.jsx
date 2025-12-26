import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>
)