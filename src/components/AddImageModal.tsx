import React, { useState } from "react";
import Modal from "./Modal";
import InputComponent from "./InputComponent";
import {
  showToastError,
  showToastSuccess,
} from "../ToastServices/toastService";
import { useImageDispatch } from "../hooks/imageHooks";
import { addImageAsync } from "../pages/Images/images";
import {
  validatePerson,
  validateTags,
  validateImage,
} from "../utils/validators";
interface AddImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumId: string;
  name: string;
}

const AddImageModal: React.FC<AddImageModalProps> = ({
  isOpen,
  onClose,
  albumId,
  name,
}) => {
  const dispatch = useImageDispatch();

  const [loading, setLoading] = useState(false);

  const [imageData, setImageData] = useState({
    person: "",
    tags: "",
    isFavorite: false,
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setImageData((prev) => ({
        ...prev,
        file: files?.[0] || null,
      }));
      return;
    }

    if (type === "checkbox") {
      setImageData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setImageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageError = validateImage(imageData.file);

    if (imageError) {
      showToastError(imageError);
      return;
    }

    const personError = validatePerson(imageData.person);

    if (personError) {
      showToastError(personError);
      return;
    }

    const tagsError = validateTags(imageData.tags);

    if (tagsError) {
      showToastError(tagsError);
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        addImageAsync({
          albumId,
          imageData: {
            image: imageData.file!,
            tags: imageData.tags,
            person: imageData.person,
            isFavorite: imageData.isFavorite,
          },
        }),
      ).unwrap();

      showToastSuccess("Image uploaded successfully");

      setImageData({
        person: "",
        tags: "",
        isFavorite: false,
        file: null,
      });

      onClose();
    } catch (error) {
      showToastError((error as string) || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setImageData({
        person: "",
        tags: "",
        isFavorite: false,
        file: null,
      });

      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Image"
      subtitle={`Upload a new image in ${name}`}
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept="image/*" onChange={handleChange} required />

        <InputComponent
          placeholder="Person"
          name="person"
          value={imageData.person}
          onChange={handleChange}
        />

        <InputComponent
          placeholder="Tags (comma separated)"
          name="tags"
          value={imageData.tags}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFavorite"
            checked={imageData.isFavorite}
            onChange={handleChange}
          />
          Favorite
        </label>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddImageModal;
