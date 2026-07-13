import { useUserContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const { user } = useUserContext();
  const userProfile = {
    name: user?.name,
    avatar: user?.profilePicture,
    email: user?.email,
  };
  // console.log(userProfile.email);
  return (
    <header className="sticky top-0 w-full z-40 glass-nav border-b border-border-subtle transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-6 max-w-[1200px] mx-auto">
        {/* Brand Name & Navigation Link */}
        <div className="flex items-center gap-8">
          {/* <button
            onClick={() => {
              setCurrentPage("albums");
              onSearchChange("");
            }}
            className="font-sans text-xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity cursor-pointer"
            id="brand-logo"
          >
            KaviosPx
          </button> */}
          <NavLink
            to="/dashboard"
            className="font-sans text-xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity"
          >
            KaviosPx
          </NavLink>

          {/* <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentPage("albums");
                onSearchChange("");
              }}
              className={`font-sans text-sm font-medium tracking-tight transition-colors cursor-pointer ${
                currentPage === "albums" || currentPage === "album-detail"
                  ? "text-primary font-semibold"
                  : "text-gray-text hover:text-primary"
              }`}
              id="nav-albums-btn"
            >
              Albums
            </button>
            <button
              onClick={() => {
                setCurrentPage("all-photos");
                onSearchChange("");
              }}
              className={`font-sans text-sm font-medium tracking-tight transition-colors cursor-pointer ${
                currentPage === "all-photos"
                  ? "text-primary font-semibold"
                  : "text-gray-text hover:text-primary"
              }`}
              id="nav-allphotos-btn"
            >
              All Photos
            </button>
          </nav> */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-text hover:text-primary"
                }`
              }
            >
              Albums
            </NavLink>

            <NavLink
              to="/all-photos"
              className={({ isActive }) =>
                `font-sans text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-text hover:text-primary"
                }`
              }
            >
              All Photos
            </NavLink>
          </nav>
        </div>

        {/* User Profile Navigation widget */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 group py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-surface-container"
                  : "hover:bg-surface-container/50"
              }`
            }
          >
            <span className="font-sans text-sm font-medium text-gray-text group-hover:text-primary transition-colors hidden sm:inline">
              My Profile
            </span>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-border-subtle shadow-sm flex-shrink-0">
              <img
                src={userProfile.avatar}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
