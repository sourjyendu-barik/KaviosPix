import "./album.css";
import React, { useState } from "react";
import { Users, Trash2, Folder, ImagePlus, Pencil } from "lucide-react";
import {
  type AlbumDataType,
  type AlbumProps,
  type FilterTab,
} from "../../../Types/types";
import { removeAlbumAsyn } from "../album";
import { useAppDispatch } from "../../../hooks/albumHooks";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import {
  getDynamicBgColor,
  getDynamicTextColor,
} from "../../../Services/getDynamicTheme";
import { delay } from "../../../Services/delayBy";
import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";
import { useUserContext } from "../../../context/AuthProvider";

type CardMode = "view" | "update";

const AlbumCard: React.FC<AlbumProps> = ({
  data,
  index,
  onAddUsersClick,
  onUpdateClick,
  onAddImageClick,
  onTagsClick,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<CardMode>("view"); // only relevant when isOwner
  const [message, setLoadingMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [showEmails, setShowEmails] = useState(false);

  const {
    url: albumImage,
    name,
    _id,
    sharedWith,
    description,
    ownerId,
  } = data as AlbumDataType;
  const { user } = useUserContext();
  const userId = user?.id;
  const hasImage = !!albumImage;
  const displayEmails = sharedWith ? sharedWith.slice(0, 2) : [];

  const isOwner = userId === ownerId;
  const isShared = !!sharedWith && sharedWith.length > 0;
  const remainingCount =
    sharedWith && sharedWith.length > 2 ? sharedWith.length - 2 : 0;

  const dynamicBg = getDynamicBgColor(index);
  const dynamicText = getDynamicTextColor(index);

  const handleDelete = async (id: string) => {
    setLoadingMessage("Deleting album....");
    try {
      await dispatch(removeAlbumAsyn(id)).unwrap();
      await delay(1000);
      showToastSuccess("Album removed successfully");
    } catch (error) {
      showToastError(error as string);
    } finally {
      setLoadingMessage(null);
    }
  };

  const onViewDetails = (albumId: string) => {
    navigate(`/dashboard/album/${albumId}`, {
      state: {
        type: "all",
        name,
        description,
        sharedWith,
        isOwner,
        id: _id,
      },
    });
  };
  const onFavoritesClick = (albumId: string) => {
    navigate(`/dashboard/album/${albumId}`, {
      state: {
        type: "favorite",
        name,
        description,
        sharedWith,
        isOwner,
        id: _id,
      },
    });
  };
  const handleTabClick = (e: React.MouseEvent, tab: FilterTab) => {
    e.stopPropagation();
    setActiveTab(tab);

    if (tab === "all") {
      onViewDetails(_id);
    } else if (tab === "tags") {
      onTagsClick(_id, name, isOwner);
    } else if (tab === "favorites") {
      onFavoritesClick(_id);
    }
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AL";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-border-subtle/50 hover-card-glow cursor-pointer flex flex-col h-full relative">
      {/* Visual Loader Overlay */}
      {message && (
        <div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Loader message={message} />
        </div>
      )}

      {/* Cover */}
      <div className="relative aspect-[4/3] w-full overflow-hidden select-none z-0 border-b border-border-subtle/50">
        {hasImage ? (
          <img
            src={albumImage}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundColor: dynamicBg }}
          >
            <Folder
              className="w-12 h-12 mb-2 stroke-[1.5]"
              style={{ color: dynamicText }}
            />
            <span
              className="font-sans text-sm font-bold tracking-wider"
              style={{ color: dynamicText }}
            >
              {initials}
            </span>
          </div>
        )}

        {/* Shared / Ownership badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="font-caption text-[10px] font-semibold tracking-wide text-white bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {isOwner ? "Owned" : "Not Owned"}
            {isShared ? " · Shared" : ""}
          </span>
        </div>

        {/* Collaborator avatars - click to reveal full emails */}
        {isShared && (
          <div className="absolute bottom-4 left-4 z-10">
            <div
              className="flex -space-x-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowEmails((prev) => !prev);
              }}
            >
              {displayEmails.map((email) => (
                <div
                  key={email}
                  className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm flex-shrink-0"
                  title={email}
                >
                  {email.charAt(0).toUpperCase()}
                </div>
              ))}
              {remainingCount > 0 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-gray-text shadow-sm flex-shrink-0">
                  +{remainingCount}
                </div>
              )}
            </div>

            {/* Full email list popup */}
            {showEmails && (
              <div
                className="absolute bottom-10 left-0 bg-white rounded-xl shadow-lg border border-border-subtle/60 py-2 px-3 min-w-[180px] max-w-[240px] z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-caption text-[10px] font-semibold text-gray-text uppercase tracking-wide mb-1.5">
                  Shared with
                </p>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                  {sharedWith!.map((email) => (
                    <li
                      key={email}
                      className="font-sans text-xs text-primary truncate"
                      title={email}
                    >
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col flex-1 text-left">
        <div className="flex items-start justify-between mb-1 gap-3">
          <h3
            className="font-sans text-[20px] font-semibold text-primary tracking-tight truncate leading-snug flex-1"
            title={name}
          >
            {name}
          </h3>

          {/* Owner-only View / Update toggle */}
          {isOwner && (
            <div
              className="flex items-center bg-surface-container rounded-full p-1 gap-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {(["view", "update"] as CardMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`text-[11px] font-semibold px-3 py-1 rounded-full capitalize transition-colors cursor-pointer ${
                    mode === m
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-text hover:text-primary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="font-sans text-sm text-gray-text leading-relaxed mb-4 line-clamp-2">
          {description || "No description provided for this collection."}
        </p>

        {/* Update mode: Add Image + Edit + Delete + Share */}
        {isOwner && mode === "update" && (
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddImageClick(_id, name);
              }}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex-1 cursor-pointer"
            >
              <ImagePlus className="w-4 h-4 stroke-[1.5]" />
              Add Image
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateClick(_id, name, description || "");
              }}
              className="p-2.5 border border-border-subtle/60 text-gray-text hover:text-primary hover:bg-surface-container rounded-xl transition-all cursor-pointer shrink-0"
              title="Edit"
            >
              <Pencil className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(_id);
              }}
              className="p-2.5 border border-border-subtle/60 text-error hover:bg-rose-50 rounded-xl transition-all cursor-pointer shrink-0"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddUsersClick(_id, name, sharedWith ?? []);
              }}
              className="p-2.5 border border-border-subtle/60 text-gray-text hover:text-primary hover:bg-surface-container rounded-xl transition-all cursor-pointer shrink-0"
              title="Share"
            >
              <Users className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        )}

        {/* View mode (default, and always for non-owners): All / Tags / Favorites */}
        {(!isOwner || mode === "view") && (
          <div
            className="mt-auto flex items-center bg-surface-container rounded-xl p-1 gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {(["all", "tags", "favorites"] as FilterTab[]).map((tab) => (
              <button
                key={tab}
                onClick={(e) => handleTabClick(e, tab)}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors capitalize cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-text hover:text-primary"
                }`}
              >
                {tab === "all" ? "All" : tab === "tags" ? "Tags" : "Favorites"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
