import React from "react";
import { Folder } from "lucide-react";
import { useImageFallback } from "../hooks/useImageFallback";
import { getAlbumTheme, getInitials } from "../Services/getDynamicTheme";
import CollaboratorAvatars from "./CollaboratorAvatars";

interface AlbumCoverProps {
  albumImage?: string | null;
  name: string;
  index: number;
  isOwner: boolean;
  isShared: boolean;
  sharedWith?: string[];
}

const AlbumCover: React.FC<AlbumCoverProps> = ({
  albumImage,
  name,
  index,
  isOwner,
  isShared,
  sharedWith,
}) => {
  const { src, isError, onError } = useImageFallback(albumImage);
  const { bg, text } = getAlbumTheme(index);
  const initials = getInitials(name);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden select-none z-0 border-b border-border-subtle/50">
      {src && !isError ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={onError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundColor: bg }}
        >
          <Folder
            className="w-12 h-12 mb-2 stroke-[1.5]"
            style={{ color: text }}
          />
          <span
            className="font-sans text-sm font-bold tracking-wider"
            style={{ color: text }}
          >
            {initials}
          </span>
        </div>
      )}

      <div className="absolute top-3 right-3 z-10">
        <span className="font-caption text-[10px] font-semibold tracking-wide text-white bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {isOwner ? "Owned" : "Not Owned"}
          {isShared ? " · Shared" : ""}
        </span>
      </div>

      {isShared && sharedWith && (
        <CollaboratorAvatars sharedWith={sharedWith} />
      )}
    </div>
  );
};

export default AlbumCover;
