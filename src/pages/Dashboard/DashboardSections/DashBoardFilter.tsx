import React from "react";
type DashBoardFilterProps = {
  activeTab: "all" | "personal" | "shared"; // <-- Match your strict state type
  setActiveTab: (tab: "all" | "personal" | "shared") => void;
};
const DashBoardFilter: React.FC<DashBoardFilterProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/60 pb-3 gap-4">
      <div className="flex items-center gap-1.5 p-1 bg-surface-container/60 rounded-xl max-w-max">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-text hover:text-primary"
          }`}
        >
          All Collections
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
            activeTab === "personal"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-text hover:text-primary"
          }`}
        >
          Personal
        </button>
        <button
          onClick={() => setActiveTab("shared")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
            activeTab === "shared"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-text hover:text-primary"
          }`}
        >
          Shared with Team
        </button>
      </div>
    </div>
  );
};

export default DashBoardFilter;
