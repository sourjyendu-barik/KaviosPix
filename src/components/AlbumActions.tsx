import React from "react";
import { ImagePlus, Pencil, Trash2, Users } from "lucide-react";

interface AlbumActionsProps {
  onAddImage: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

const AlbumActions: React.FC<AlbumActionsProps> = ({
  onAddImage,
  onEdit,
  onDelete,
  onShare,
}) => (
  <div className="flex items-center gap-2 mb-4">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onAddImage();
      }}
      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex-1 cursor-pointer"
    >
      <ImagePlus className="w-4 h-4 stroke-[1.5]" />
      Add Image
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className="p-2.5 border border-border-subtle/60 text-gray-text hover:text-primary hover:bg-surface-container rounded-xl transition-all cursor-pointer shrink-0"
      title="Edit"
    >
      <Pencil className="w-4 h-4 stroke-[1.5]" />
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="p-2.5 border border-border-subtle/60 text-error hover:bg-rose-50 rounded-xl transition-all cursor-pointer shrink-0"
      title="Delete"
    >
      <Trash2 className="w-4 h-4 stroke-[1.5]" />
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onShare();
      }}
      className="p-2.5 border border-border-subtle/60 text-gray-text hover:text-primary hover:bg-surface-container rounded-xl transition-all cursor-pointer shrink-0"
      title="Share"
    >
      <Users className="w-4 h-4 stroke-[1.5]" />
    </button>
  </div>
);

export default AlbumActions;
