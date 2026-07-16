import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

export default App;
