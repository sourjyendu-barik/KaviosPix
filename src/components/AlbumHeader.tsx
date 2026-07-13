import React from "react";
import { Image, Users } from "lucide-react";

interface AlbumHeaderProps {
  name: string;
  type: string;
  description?: string;
  sharedWith?: string[];
  imageCount?: number;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({
  name,
  description,
  sharedWith,
  imageCount,
  type,
}) => {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between flex-wrap gap-6">
          {/* Left */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Image className="h-8 w-8 text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {type === "tags" && `View ${name} Images By Tags`}
                {type !== "tags" && `View ${type} images of ${name}`}
              </h1>

              {description && (
                <p className="mt-2 max-w-2xl text-gray-500">{description}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {imageCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <Image size={16} />
                    <span>{imageCount} Images</span>
                  </div>
                )}

                {sharedWith && sharedWith.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{sharedWith.length} Shared</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right */}
          {sharedWith && sharedWith.length > 0 && (
            <div className="flex flex-wrap justify-end gap-2">
              {sharedWith.map((user) => (
                <span
                  key={user}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {user}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
