// import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
