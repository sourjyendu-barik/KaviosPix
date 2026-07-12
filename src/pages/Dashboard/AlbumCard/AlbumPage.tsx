import React, { useState } from "react";
import AlbumCard from "./AlbumCard";
// import AddUsersInAlbum from "../AddUsersInAlbum";
// import UpdateAlbum from "../UpdateAlbum";
import { type AlbumDataType } from "../../../Types/types";
import AddNewUserModal from "../Modals/AddNewUserModal";
import UpdateAlbumModel from "../Modals/UpdateAlbumModel";
import AddImageModal from "../../../components/AddImageModal";
interface AlbumsPageProps {
  albums: AlbumDataType[];
  onViewDetails?: (albumId: string) => void;
}

interface SelectedAlbumForShare {
  id: string;
  name: string;
  users: string[];
}

interface SelectedAlbumForUpdate {
  id: string;
  name: string;
  description: string;
}
interface SelectedAlbumForAddImage {
  id: string;
  name: string;
}
const AlbumsPage: React.FC<AlbumsPageProps> = ({ albums }) => {
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddImageModel, setShowAddImageModel] = useState(false);

  const [selectedAlbumForShare, setSelectedAlbumForShare] =
    useState<SelectedAlbumForShare | null>(null);

  const [selectedAlbumForUpdate, setSelectedAlbumForUpdate] =
    useState<SelectedAlbumForUpdate | null>(null);

  const [selectedAlbumForAddImage, setSelectedAlbumForAddImage] =
    useState<SelectedAlbumForAddImage | null>(null);

  const handleAddUsersClick = (
    albumId: string,
    albumName: string,
    sharedWith: string[],
  ) => {
    setSelectedAlbumForShare({
      id: albumId,
      name: albumName,
      users: sharedWith,
    });
    setShowAddUsersModal(true);
  };

  const handleUpdateClick = (
    albumId: string,
    albumName: string,
    description: string,
  ) => {
    setSelectedAlbumForUpdate({ id: albumId, name: albumName, description });
    setShowUpdateModal(true);
  };
  const handleAddImageClick = (albumId: string, name: string) => {
    setSelectedAlbumForAddImage({ id: albumId, name: name });
    setShowAddImageModel(true);
  };

  const handleCloseAddUsersModal = () => {
    setShowAddUsersModal(false);
    setSelectedAlbumForShare(null);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedAlbumForUpdate(null);
  };
  const handleCloseAddImageModal = () => {
    setShowAddImageModel(false);
    setSelectedAlbumForAddImage(null);
  };
  return (
    <>
      {/* Albums Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album, index) => (
          <AlbumCard
            key={album._id}
            data={album}
            index={index}
            onAddUsersClick={handleAddUsersClick}
            onUpdateClick={handleUpdateClick}
            onAddImageClick={handleAddImageClick}
          />
        ))}
      </div>

      {/* Modals rendered once at top level */}
      {selectedAlbumForShare && (
        <AddNewUserModal
          isOpen={showAddUsersModal}
          onClose={handleCloseAddUsersModal}
          userList={selectedAlbumForShare.users}
          albumId={selectedAlbumForShare.id}
          albumName={selectedAlbumForShare.name}
        />
      )}

      {selectedAlbumForUpdate && (
        <UpdateAlbumModel
          isOpen={showUpdateModal}
          onClose={handleCloseUpdateModal}
          albumId={selectedAlbumForUpdate.id}
          albumName={selectedAlbumForUpdate.name}
          desc={selectedAlbumForUpdate.description}
        />
      )}

      {selectedAlbumForAddImage && (
        <AddImageModal
          isOpen={showAddImageModel}
          onClose={handleCloseAddImageModal}
          albumId={selectedAlbumForAddImage.id}
          name={selectedAlbumForAddImage.name}
        />
      )}
    </>
  );
};

export default AlbumsPage;
