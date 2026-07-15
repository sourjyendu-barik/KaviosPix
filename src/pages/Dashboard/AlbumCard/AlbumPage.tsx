import React, { useState } from "react";
import AlbumCard from "./AlbumCard";
import AddNewUserModal from "../Modals/AddNewUserModal";
import UpdateAlbumModel from "../Modals/UpdateAlbumModel";
import AddImageModal from "../../../components/AddImageModal";
import { type AlbumDataType } from "../../../Types/types";
import ViewImagesByTags from "../Modals/ViewImagesByTags";

type ModalType = "share" | "update" | "addImage" | "tags" | null;

interface SelectedAlbum {
  id: string;
  name: string;
  description?: string;
  users?: string[];
  isOwner?: boolean;
}

interface AlbumsPageProps {
  albums: AlbumDataType[];
}

const AlbumsPage: React.FC<AlbumsPageProps> = ({ albums }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(
    null,
  );

  // Share
  const handleAddUsersClick = (
    albumId: string,
    albumName: string,
    sharedWith: string[],
  ) => {
    setSelectedAlbum({
      id: albumId,
      name: albumName,
      users: sharedWith,
    });

    setActiveModal("share");
  };

  // Update
  const handleUpdateClick = (
    albumId: string,
    albumName: string,
    description: string,
  ) => {
    setSelectedAlbum({
      id: albumId,
      name: albumName,
      description,
    });

    setActiveModal("update");
  };

  // Add Image
  const handleAddImageClick = (albumId: string, name: string) => {
    setSelectedAlbum({
      id: albumId,
      name,
    });

    setActiveModal("addImage");
  };

  // Tags
  const handleAddImagesByTags = (
    albumId: string,
    name: string,
    isOwner: boolean,
  ) => {
    setSelectedAlbum({
      id: albumId,
      name,
      isOwner,
    });

    setActiveModal("tags");
  };

  // Close All Modals
  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedAlbum(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {albums.map((album, index) => (
          <AlbumCard
            key={album._id}
            data={album}
            index={index}
            onAddUsersClick={handleAddUsersClick}
            onUpdateClick={handleUpdateClick}
            onAddImageClick={handleAddImageClick}
            onTagsClick={handleAddImagesByTags}
          />
        ))}
      </div>

      {/* Share Users */}
      {activeModal === "share" && selectedAlbum && (
        <AddNewUserModal
          isOpen={true}
          onClose={handleCloseModal}
          albumId={selectedAlbum.id}
          albumName={selectedAlbum.name}
          sharedUsers={selectedAlbum.users ?? []}
        />
      )}

      {/* Update Album */}
      {activeModal === "update" && selectedAlbum && (
        <UpdateAlbumModel
          isOpen={true}
          onClose={handleCloseModal}
          albumId={selectedAlbum.id}
          albumName={selectedAlbum.name}
          desc={selectedAlbum.description ?? ""}
        />
      )}

      {/* Add Image */}
      {activeModal === "addImage" && selectedAlbum && (
        <AddImageModal
          isOpen={true}
          onClose={handleCloseModal}
          albumId={selectedAlbum.id}
          name={selectedAlbum.name}
        />
      )}

      {/* Tags Modal */}
      {activeModal === "tags" && selectedAlbum && (
        <ViewImagesByTags
          albumId={selectedAlbum.id}
          name={selectedAlbum.name}
          description={selectedAlbum.description}
          isOpen={true}
          onClose={handleCloseModal}
          sharedWith={selectedAlbum.users}
          isOwner={selectedAlbum.isOwner}
          id={selectedAlbum.id}
        />
      )}
    </>
  );
};

export default AlbumsPage;
