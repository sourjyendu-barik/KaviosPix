import React, { useState } from "react";
import Modal from "../../../components/Modal";
import SelectUsers from "../../../components/SelectUsers";
import { useAlbumDispatch } from "../../../hooks/albumHooks";
import { shareAlbumAsyn } from "../album";
import {
  showToastError,
  showToastSuccess,
} from "../../../ToastServices/toastService";

interface AddUsersInAlbumProps {
  isOpen: boolean;
  onClose: () => void;
  userList: string[];
  albumId: string;
  albumName: string;
}

const AddNewUserModal: React.FC<AddUsersInAlbumProps> = ({
  isOpen,
  onClose,
  userList,
  albumId,
  albumName,
}) => {
  const dispatch = useAlbumDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      showToastError("Please select at least one user");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        shareAlbumAsyn({ albumId, emails: selectedUsers }),
      ).unwrap();
      showToastSuccess("Users added successfully");
      setSelectedUsers([]);
      onClose();
    } catch (error: any) {
      showToastError(error?.response?.data?.message || "Failed to add users");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedUsers([]);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Users to Album"
      subtitle={`Sharing "${albumName}"`}
      size="md"
      closeOnBackdropClick={!loading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <SelectUsers
          users={userList}
          value={selectedUsers}
          onChange={setSelectedUsers}
          label="Select users to add"
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
            disabled={loading || selectedUsers.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Adding..." : "Add Users"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewUserModal;
