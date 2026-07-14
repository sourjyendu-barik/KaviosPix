import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div
      className="flex min-h-screen bg-gray-50 dark:bg-zinc-950"
      id="main-layout-wrapper"
    >
      {/* Main Container */}
      <div className="flex-grow flex flex-col min-h-screen">
        {/* Responsive Header */}
        <Navbar />

        {/* Core Main Scrollable Content */}
        <main className="mx-auto flex-grow w-full max-w-[1400px] px-4 md:px-12 pt-6 pb-10 md:pt-8 md:pb-12">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
