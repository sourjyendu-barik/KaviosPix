import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div
      className="flex min-h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden"
      id="main-layout-wrapper"
    >
      {/* Main Container */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Responsive Header */}
        <Navbar />

        {/* Core Main Scrollable Content */}
        <main className="flex-grow py-6 md:py-10 px-4 md:px-12 w-full max-w-[1400px] mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
