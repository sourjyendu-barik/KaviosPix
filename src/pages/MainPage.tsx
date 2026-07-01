import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="container py-3 flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
