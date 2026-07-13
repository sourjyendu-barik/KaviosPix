import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddImageModal from "../../components/AddImageModal";
import ImageCard from "../../components/ImageCard";
import Loader from "../../components/Loader";
import AlbumHeader from "../../components/AlbumHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/albumHooks";
import {
  fetchAllImagesAsync,
  fetchFavoriteImagesAsync,
  fetchImagesByTagsAsync,
  clearImages,
} from "./images";

interface LocationState {
  name: string;
  description?: string;
  sharedWith?: string[];
  type: "all" | "favorite" | "tags";
  tags?: string[];
  isOwner: boolean;
  id: string;
}

const ImagesOfAlbum = () => {
  const { albumId } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const {
    data: images,
    status,
    error,
  } = useAppSelector((state) => state.images);
  const { name, description, sharedWith, type, tags, isOwner, id } =
    (location.state as LocationState) || {};
  // console.log(id);
  const loading = status === "loading" || status === "idle";

  useEffect(() => {
    if (!albumId) return;

    switch (type) {
      case "favorite":
        dispatch(fetchFavoriteImagesAsync(albumId));
        break;
      case "tags":
        if (!tags || tags.length === 0) {
          dispatch(clearImages());
          return;
        }
        dispatch(fetchImagesByTagsAsync({ albumId, tags }));
        break;
      case "all":
      default:
        dispatch(fetchAllImagesAsync(albumId));
        break;
    }
  }, [albumId, type, JSON.stringify(tags), dispatch]);

  if (loading) return <Loader message="Loading..." />;

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div>
      <AlbumHeader
        name={name}
        description={description}
        sharedWith={sharedWith}
        imageCount={images.length}
        type={type}
      />

      <div className="px-4 pb-6">
        <div className="flex justify-end mb-4">
          {isOwner && (
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-black hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Add New Image
            </button>
          )}
        </div>
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">
            {type === "tags"
              ? "No images found for these tags."
              : type === "favorite"
                ? "No favorite images yet."
                : "No images found."}
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {images.map((image: any) => (
              <ImageCard key={image._id} image={image} isOwner={isOwner} />
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <AddImageModal
          isOpen={true}
          onClose={() => {
            setShowModal(false);
          }}
          albumId={id}
          name={name}
        />
      )}
    </div>
  );
};

export default ImagesOfAlbum;
