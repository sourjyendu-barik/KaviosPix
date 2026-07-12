import React from "react";
import { Search } from "lucide-react";
import { useUserContext } from "../context/AuthProvider";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const [currentPage, setCurrentPage] = React.useState<string>("albums");
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useUserContext();
  const onSearchChange = (query: string) => {
    setSearchQuery(query);
    window.dispatchEvent(new CustomEvent("app-search", { detail: query }));
  };

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
            to="/albums"
            onClick={() => onSearchChange("")}
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
              onClick={() => onSearchChange("")}
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
              onClick={() => onSearchChange("")}
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

        {/* Unified Interactive Search Input */}
        <div className="flex-1 max-w-md mx-6 md:mx-8">
          <div className="relative w-full group">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text group-focus-within:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-surface-container hover:bg-border-subtle/40 focus:bg-white border-0 focus:ring-2 focus:ring-primary/10 rounded-lg py-2 pl-10 pr-4 text-sm text-primary placeholder:text-gray-text transition-all outline-none"
              placeholder={
                currentPage === "all-photos"
                  ? "Search all photos by title or tag..."
                  : "Search albums..."
              }
              id="nav-search-input"
            />
          </div>
        </div>

        {/* User Profile Navigation widget */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/profile"
            onClick={() => onSearchChange("")}
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
