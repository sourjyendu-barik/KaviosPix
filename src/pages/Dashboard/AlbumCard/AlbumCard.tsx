import React, { useState } from "react";
import { Users, Trash2, Folder } from "lucide-react";
import { type AlbumDataType } from "../../../Types/types";
import { removeAlbumAsyn } from "../album";
import { useAlbumDispatch } from "../../../hooks/albumHooks";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import "./album.css";

import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";

const getDynamicBgColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 65%, 30%, 0.25)`;
};

const getDynamicTextColor = (id: number) => {
  const hue = (id * 137.508) % 360;
  return `hsla(${hue}, 70%, 25%, 1)`;
};

interface AlbumProps {
  data: AlbumDataType;
  index: number;
  onAddUsersClick: (
    albumId: string,
    albumName: string,
    sharedWith: string[],
  ) => void;
  onUpdateClick: (
    albumId: string,
    albumName: string,
    description: string,
  ) => void;
  onAddImageClick: (albumId: string, name: string) => void;
}

const AlbumCard: React.FC<AlbumProps> = ({
  data,
  index,
  onAddUsersClick,
  onUpdateClick,
  onAddImageClick,
}) => {
  const dispatch = useAlbumDispatch();
  const [message, setLoadingMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { url: albumImage, name, _id, sharedWith, description } = data;
  const hasImage = !!albumImage;

  const dynamicBg = getDynamicBgColor(index);
  const dynamicText = getDynamicTextColor(index);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
        name,
        description,
        sharedWith,
      },
    });
  };

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AL";

  const displayEmails = sharedWith ? sharedWith.slice(0, 2) : [];
  const remainingCount =
    sharedWith && sharedWith.length > 2 ? sharedWith.length - 2 : 0;
  //console.log(albumImage);
  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-border-subtle/50 hover-card-glow cursor-pointer flex flex-col h-full relative"
      onClick={() => onViewDetails?.(_id)}
    >
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

        {/* Collaborator avatars */}
        {sharedWith && sharedWith.length > 0 && (
          <div className="absolute bottom-4 left-4 flex -space-x-2 z-10">
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
        )}
      </div>

      {/* Content area */}
      <div className="p-6 flex flex-col flex-1 text-left">
        <div className="flex items-start justify-between mb-2 gap-3">
          <h3
            className="font-sans text-[20px] font-semibold text-primary tracking-tight truncate leading-snug flex-1"
            title={name}
          >
            {name}
          </h3>
          {sharedWith && sharedWith.length > 0 && (
            <span className="font-caption text-[11px] font-semibold text-secondary bg-secondary/5 px-2.5 py-0.5 rounded-full shrink-0">
              Shared
            </span>
          )}
        </div>

        <p className="font-sans text-sm text-gray-text leading-relaxed mb-6 line-clamp-2">
          {description || "No description provided for this collection."}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateClick(_id, name, description || "");
              }}
              className="bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold py-2 px-3 rounded-xl transition-colors flex-1 min-w-[88px] text-center cursor-pointer"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddImageClick(_id, name);
              }}
              className="border border-border-subtle/60 hover:bg-surface-container text-primary text-xs font-semibold py-2 px-3 rounded-xl transition-colors flex-1 min-w-[88px] text-center cursor-pointer"
            >
              Add Image
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddUsersClick(_id, name, sharedWith ?? []);
              }}
              className="p-2 text-gray-text hover:text-primary hover:bg-surface-container rounded-xl transition-all cursor-pointer"
              title="Share"
            >
              <Users className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(_id);
              }}
              className="p-2 text-gray-text hover:text-error hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
