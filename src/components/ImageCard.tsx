//import { useState } from "react";
import { Star } from "lucide-react";

interface ImageCardProps {
  image: {
    _id: string;
    url: string;
    name?: string;
    isFavorite?: boolean;
    tags?: [] | string[];
  };
}

const ImageCard = ({ image }: ImageCardProps) => {
  const handleFavoriteClick = () => {};
  const onDetailClick = () => {};

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Image + favorite star */}
      <div className="relative">
        <img
          src={image.url}
          alt={image.name || "Album Image"}
          className="w-full h-56 object-cover block"
        />

        <button
          onClick={handleFavoriteClick}
          aria-label="Toggle favorite"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
        >
          <Star
            size={18}
            className={
              image.isFavorite
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-700"
            }
          />
        </button>
      </div>

      {/* Name / location / detail button */}
      <div className="flex items-center justify-between px-3.5 py-3">
        <div>
          {image.name && (
            <div className="font-semibold text-sm text-gray-900">
              {image.name}
            </div>
          )}
          {image.tags && (
            <div className="text-xs text-blue-500 uppercase tracking-wide mt-0.5">
              {image.tags.join(" , ")}
            </div>
          )}
        </div>

        <button
          onClick={() => onDetailClick}
          className="bg-gray-900 text-white rounded-full px-4 py-2 text-xs font-medium"
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
