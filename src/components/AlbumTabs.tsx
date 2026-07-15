import React from "react";
import { type FilterTab } from "../Types/types";

interface AlbumTabsProps {
  activeTab: FilterTab;
  onTabClick: (e: React.MouseEvent, tab: FilterTab) => void;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "tags", label: "Tags" },
  { key: "favorites", label: "Favorites" },
];

const AlbumTabs: React.FC<AlbumTabsProps> = ({ activeTab, onTabClick }) => (
  <div
    className="mt-auto flex items-center bg-surface-container rounded-xl p-1 gap-1"
    onClick={(e) => e.stopPropagation()}
  >
    {TABS.map(({ key, label }) => (
      <button
        key={key}
        onClick={(e) => onTabClick(e, key)}
        className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors capitalize cursor-pointer ${
          activeTab === key
            ? "bg-white text-primary shadow-sm"
            : "text-gray-text hover:text-primary"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

export default AlbumTabs;
