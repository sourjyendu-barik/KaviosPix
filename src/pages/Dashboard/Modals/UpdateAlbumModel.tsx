import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import InputComponent from "../../../components/InputComponent";
import { useAppDispatch } from "../../../hooks/albumHooks";
import { updateAlbumAsync } from "../album";
import useDelay from "../../../hooks/delayHook";
import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";
import { validateDescription } from "../../../utils/validators";
interface UpdateAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  albumName: string;
  albumId: string;
  desc: string;
}

const UpdateAlbumModel: React.FC<UpdateAlbumProps> = ({
  isOpen,
  onClose,
  albumName,
  albumId,
  desc,
}) => {
  const delay = useDelay();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(desc);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDescription(desc);
  }, [isOpen, desc]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const descriptionError = validateDescription(description);
    if (descriptionError) {
      showToastError(descriptionError);
      return;
    }

    setLoading(true);

    try {
      await dispatch(updateAlbumAsync({ albumId, description })).unwrap();
      await delay(1000);
      showToastSuccess("Album updated successfully");
      onClose();
    } catch (error) {
      showToastError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Album Description"
      subtitle={`Editing "${albumName}"`}
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputComponent
          value={description}
          onChange={handleChange}
          name="description"
          placeholder="Enter album description"
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
            {loading ? "Updating..." : "Update Description"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateAlbumModel;
