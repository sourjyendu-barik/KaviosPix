import { useUserContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Navbar() {
  const { user } = useUserContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userProfile = {
    name: user?.name,
    avatar: user?.profilePicture,
    email: user?.email,
  };
  // console.log(userProfile.email);
  return (
    <header className="sticky top-0 w-full z-40 glass-nav border-b border-border-subtle transition-all duration-300">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-12">
        {/* Left */}
        <div className="flex items-center gap-10">
          <NavLink
            to="/dashboard"
            className="font-sans text-xl font-bold tracking-tighter text-primary"
          >
            KaviosPx
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-sans text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-text hover:text-primary"
                }`
              }
            >
              Albums
            </NavLink>

            {/* <NavLink
              to="/all-photos"
              className={({ isActive }) =>
                `font-sans text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-text hover:text-primary"
                }`
              }
            >
              All Photos
            </NavLink> */}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Desktop Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hidden md:flex items-center gap-3 group py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-surface-container"
                  : "hover:bg-surface-container/50"
              }`
            }
          >
            <span className="text-sm font-medium text-gray-text hidden sm:inline">
              My Profile
            </span>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-border-subtle">
              <img
                src={userProfile.avatar}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-container"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border-subtle bg-white shadow-lg">
          <nav className="flex flex-col p-4">
            <NavLink
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 font-medium text-gray-text hover:text-primary"
            >
              Albums
            </NavLink>

            {/* <NavLink
              to="/all-photos"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 font-medium text-gray-text hover:text-primary"
            >
              All Photos
            </NavLink> */}

            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-3 border-t border-border-subtle mt-2"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border-subtle">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="font-medium">My Profile</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
