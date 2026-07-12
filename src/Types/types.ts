export type User = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
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

export type updateAlbumProps = {
  albumId: string;
  description: string;
};

export type addUsersToAlbumProps = {
  albumId: string;
  emails: string[];
};

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
