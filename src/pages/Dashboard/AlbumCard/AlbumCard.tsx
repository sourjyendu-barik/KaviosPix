import "./album.css";
import React, { useState } from "react";
import {
  type AlbumDataType,
  type AlbumProps,
  type FilterTab,
} from "../../../Types/types";
import { removeAlbumAsyn } from "../album";
import { useAppDispatch } from "../../../hooks/albumHooks";
import Loader from "../../../components/Loader";
import { useNavigate } from "react-router-dom";
import { delay } from "../../../Services/delayBy";
import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";
import { useUserContext } from "../../../context/AuthProvider";
import AlbumCover from "../../../components/AlbumCover";
import AlbumActions from "../../../components/AlbumActions";
import AlbumTabs from "../../../components/AlbumTabs";
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
  const [mode, setMode] = useState<CardMode>("view");
  const [message, setLoadingMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

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

  const isOwner = userId === ownerId;
  const isShared = !!sharedWith && sharedWith.length > 0;

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

  const navigateToAlbum = (type: FilterTab, albumId: string) => {
    navigate(`/dashboard/album/${albumId}`, {
      state: { type, name, description, sharedWith, isOwner, id: _id },
    });
  };

  const handleTabClick = (e: React.MouseEvent, tab: FilterTab) => {
    e.stopPropagation();
    setActiveTab(tab);

    if (tab === "all") navigateToAlbum("all", _id);
    else if (tab === "tags") onTagsClick(_id, name, isOwner);
    else if (tab === "favorites") navigateToAlbum("favorites", _id);
  };

  return (
    <div className="group glass-nav rounded-2xl overflow-hidden border border-border-subtle/50 hover-card-glow cursor-pointer flex flex-col h-full relative">
      {message && (
        <div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-all duration-300 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Loader message={message} />
        </div>
      )}

      <AlbumCover
        albumImage={albumImage}
        name={name}
        index={index}
        isOwner={isOwner}
        isShared={isShared}
        sharedWith={sharedWith}
      />

      <div className="p-6 flex flex-col flex-1 text-left">
        <div className="flex items-start justify-between mb-1 gap-3">
          <h3
            className="font-sans text-[20px] font-semibold text-primary tracking-tight truncate leading-snug flex-1"
            title={name}
          >
            {name}
          </h3>

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

        {isOwner && mode === "update" ? (
          <AlbumActions
            onAddImage={() => onAddImageClick(_id, name)}
            onEdit={() => onUpdateClick(_id, name, description || "")}
            onDelete={() => handleDelete(_id)}
            onShare={() => onAddUsersClick(_id, name, sharedWith ?? [])}
          />
        ) : null}

        {!isOwner || mode === "view" ? (
          <AlbumTabs activeTab={activeTab} onTabClick={handleTabClick} />
        ) : null}
      </div>
    </div>
  );
};

export default AlbumCard;
