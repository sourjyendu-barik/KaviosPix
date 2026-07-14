import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputComponent from "./InputComponent";
import { createUserDetails, updateUserDetails } from "../api";
import { delay } from "../Services/delayBy";
import {
  showToastError,
  showToastSuccess,
} from "../ToastServices/toastService";

import { type UserDetails, type UserDetailsForm } from "../Types/types";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: UserDetails;
  onSuccess: (details: UserDetails) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const emptyForm: UserDetailsForm = {
    location: "",
    about: "",
    hobbies: "",
    role: "user",
  };

  const [formData, setFormData] = useState<UserDetailsForm>(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        location: initialData?.location ?? "",
        about: initialData?.about ?? "",
        hobbies: initialData?.hobbies?.join(", ") ?? "",
        role: initialData?.role ?? "user",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.location.trim()) {
      return showToastError("Location is required");
    }

    if (!formData.about.trim()) {
      return showToastError("About is required");
    }

    setLoading(true);

    try {
      const payload: UserDetails = {
        location: formData.location.trim(),
        about: formData.about.trim(),
        hobbies: formData.hobbies
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        role: formData.role,
      };

      let response;

      if (initialData?._id) {
        response = await updateUserDetails(payload);
        showToastSuccess("User details updated successfully");
      } else {
        response = await createUserDetails(payload);
        showToastSuccess("User details created successfully");
      }

      await delay(800);

      onSuccess(response.data.userDetails);

      onClose();
    } catch (err) {
      showToastError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      title={initialData ? "Update User Details" : "Add User Details"}
      subtitle="Tell us more about yourself"
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputComponent
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <InputComponent
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleChange}
          required
        />

        <InputComponent
          name="hobbies"
          placeholder="coding, cricket, reading"
          value={formData.hobbies}
          onChange={handleChange}
        />

        <div>
          <label className="mb-1 block text-sm font-medium">Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Saving..." : initialData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserDetailsModal;
