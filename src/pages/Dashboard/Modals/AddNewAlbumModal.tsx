import React, { useState } from "react";
import Modal from "../../../components/Modal";
import InputComponent from "../../../components/InputComponent";
import { useAppDispatch } from "../../../hooks/albumHooks";
import { addAlbumAsync } from "../album";
import { type AlbumInputDataType } from "../../../Types/types";
import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";
import {
  validateAlbumName,
  validateDescription,
} from "../../../utils/validators";
interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAlbumModal: React.FC<AddAlbumModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState<AlbumInputDataType>({
    name: "",
    description: "",
  });

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAlbumData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateAlbumName(albumData.name);

    if (nameError) {
      showToastError(nameError);
      return;
    }

    const descriptionError = validateDescription(albumData.description);

    if (descriptionError) {
      showToastError(descriptionError);
      return;
    }
    setLoading(true);

    try {
      await dispatch(addAlbumAsync(albumData)).unwrap();
      await delay(1000);
      showToastSuccess("New album added successfully");
      setAlbumData({ name: "", description: "" });
      onClose();
    } catch (error) {
      showToastError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setAlbumData({ name: "", description: "" });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Album"
      subtitle="Add a new album to get started"
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputComponent
          placeholder="Album name"
          value={albumData.name}
          name="name"
          onChange={handleChange}
          required
        />
        <InputComponent
          placeholder="Album description (optional)"
          value={albumData.description}
          name="description"
          onChange={handleChange}
        />

        <div className="flex gap-3 justify-end pt-4">
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
            {loading ? "Creating..." : "Create Album"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewAlbumModal;
