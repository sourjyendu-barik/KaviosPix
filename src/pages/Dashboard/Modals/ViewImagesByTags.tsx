import React, { useState } from "react";
import Modal from "../../../components/Modal";
import InputComponent from "../../../components/InputComponent";
import useDelay from "../../../hooks/delayHook";
import { showToastError } from "../../../ToastServices/toastService";
import { useNavigate } from "react-router-dom";

interface ViewImagesByTagsProps {
  albumId: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
  description?: string;
  sharedWith?: string[];
  isOwner?: boolean;
  id: string;
}

const ViewImagesByTags: React.FC<ViewImagesByTagsProps> = ({
  isOpen,
  onClose,
  albumId,
  name,
  description,
  sharedWith,
  isOwner,
  id,
}) => {
  const delay = useDelay();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!albumId) {
      showToastError("Album ID not found");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tags.length === 0) {
      showToastError("Please enter at least one tag");
      return;
    }

    setLoading(true);

    try {
      navigate(`/dashboard/album/${albumId}`, {
        state: {
          type: "tags",
          name,
          description,
          sharedWith,
          tags,
          isOwner,
          id,
        },
      });
      await delay(300);
      onClose();
    } catch (error) {
      showToastError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTagsInput("");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`View ${name} Images by Tags`}
      subtitle="Enter tags separated by commas"
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputComponent
          value={tagsInput}
          onChange={handleChange}
          name="tags"
          placeholder="e.g. Cars, nature, travel"
        />

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Applying..." : "View Images"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ViewImagesByTags;
