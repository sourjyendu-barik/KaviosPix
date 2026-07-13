import { useState } from "react";
import {
  Heart,
  HardDrive,
  User,
  Calendar,
  Tag,
  MessageSquare,
  Trash2,
} from "lucide-react";
import type { Image } from "../../Types/types";
import MetaRow from "../../components/MetaRow";
interface ImageDetailProps {
  data: Image;
  onToggleFavorite: () => void;
  onDelete: () => void;
  onAddComment: (comment: string) => void;
  onBack?: () => void;
}

const ImageDetail = ({
  data,
  onToggleFavorite,
  onDelete,
  onAddComment,
}: ImageDetailProps) => {
  const [imageData, setImageData] = useState(data);
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleToggleFavorite = async () => {
    onToggleFavorite();
    setImageData((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handlePost = async () => {
    if (!commentText.trim()) return;
    setPosting(true);
    try {
      await onAddComment(commentText.trim());
      setImageData((prev) => ({
        ...prev,
        comments: [...(prev.comments ?? []), commentText.trim()],
      }));
      setCommentText("");
    } finally {
      setPosting(false);
    }
  };

  const formattedDate = imageData.uploadedAt
    ? new Date(imageData.uploadedAt).toLocaleDateString()
    : "Unknown";

  const fileSizeMB = imageData.size
    ? (imageData.size / (1024 * 1024)).toFixed(2)
    : "0";

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      {/* Image + Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <img
            src={imageData.url}
            alt={imageData.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {imageData.name}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`rounded-full p-2 transition-colors ${
                  imageData.isFavorite ? "bg-yellow-100" : "bg-gray-100"
                }`}
              >
                <Heart
                  size={18}
                  className={
                    imageData.isFavorite
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }
                />
              </button>
              <button
                onClick={onDelete}
                className="rounded-full p-2 bg-gray-100 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <MetaRow
              icon={<HardDrive size={16} />}
              label="File Size"
              value={`${fileSizeMB} MB`}
            />
            <MetaRow
              icon={<User size={16} />}
              label="Person"
              value={imageData.person || "Unknown"}
            />
            <MetaRow
              icon={<Calendar size={16} />}
              label="Uploaded"
              value={formattedDate}
            />

            <div className="flex gap-3">
              <div className="text-gray-400 mt-0.5">
                <Tag size={16} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1.5">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {imageData.tags?.length ? (
                    imageData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion</h3>

        <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-64">
          {!imageData.comments?.length ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-300">
              <MessageSquare size={28} />
              <p className="text-sm text-gray-400 mt-2">No comments yet</p>
            </div>
          ) : (
            imageData.comments.map((comment, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-sm text-gray-600">{comment}</p>
              </div>
            ))
          )}
        </div>

        <div className="relative">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            placeholder="Add your perspective..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-3 pr-16 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            onClick={handlePost}
            disabled={posting || !commentText.trim()}
            className="absolute right-1.5 top-1.5 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-md disabled:opacity-40"
          >
            {posting ? "..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
