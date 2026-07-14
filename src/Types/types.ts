export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  joined: string;
};

export interface UserProfile extends User {
  bio?: string;
  role?: string;
  department?: string;
  location?: string;
}

export type AlbumInputDataType = {
  name: string;
  description: string;
};

export interface AlbumDataType extends AlbumInputDataType {
  _id: string;
  ownerId: string;
  sharedWith: string[];
  url?: string;
}

export interface AlbumProps {
  data: AlbumDataType;
  index: number;
  onAddUsersClick: (
    albumId: string,
    albumName: string,
    sharedWith: string[],
  ) => void;
  onUpdateClick: (
    albumId: string,
    albumName: string,
    description: string,
  ) => void;
  onAddImageClick: (albumId: string, name: string) => void;
  onTagsClick: (albumId: string, name: string, isOwner: boolean) => void;
}

export type FilterTab = "all" | "tags" | "favorites";

export type UpdateAlbumProps = {
  albumId: string;
  description: string;
};

export type AddUsersToAlbumProps = {
  albumId: string;
  emails: string[];
};

/* -------------------------------------------------------------------------- */
/*                           AlbumsPage Modal Types                           */
/* -------------------------------------------------------------------------- */

export type ModalType = "share" | "update" | "addImage" | "tags" | null;

export interface SelectedAlbum {
  id: string;
  name: string;
  description?: string;
  users?: string[];
}

export interface AlbumsPageProps {
  albums: AlbumDataType[];
}

// /---------------------------------------------------------------------/
/-------------Images-----------------------------------/;

export interface Image {
  _id: string;
  albumId: string;
  name: string;
  url: string;
  publicId: string;
  size: number;

  tags: string[] | [];
  person?: string;
  isFavorite?: boolean;
  comments: string[] | [];
  uploadedAt?: Date;
}

export interface ImageInputDataType {
  image: File;
  tags: string;
  person: string;
  isFavorite: boolean;
}

export interface AddImageProps {
  albumId: string;
  imageData: ImageInputDataType;
}

//userdetailes
export interface UserDetails {
  _id?: string;
  userId?: string;
  location?: string;
  role?: "user" | "admin" | "moderator";
  about?: string;
  hobbies?: string[];
}

export interface UserDetailsForm {
  location: string;
  about: string;
  hobbies: string;
  role: "user" | "admin" | "moderator";
}
