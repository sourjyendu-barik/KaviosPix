import { useNavigate, useLocation } from "react-router-dom";
import {
  toggleFavoriteImageAsync,
  deleteImageAsync,
  addCommentToImageAsync,
} from "./images";
import ImageDetail from "./ImageDetails";
//import type { Image } from "../../Types/types";
import { useAppDispatch } from "../../hooks/albumHooks";
import {
  showToastSuccess,
  showToastError,
} from "../../ToastServices/toastService";
const ImageDetailContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isOwner } = location.state;

  const handleToggleFavorite = async () => {
    const newFavoriteStatus = !data.isFavorite;
    try {
      await dispatch(
        toggleFavoriteImageAsync({
          albumId: data.albumId,
          imageId: data._id,
          isFavorite: newFavoriteStatus,
        }),
      ).unwrap();
    } catch (err: any) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Failed to update favorite status";
      showToastError(message);
    }
    // } finally {
    //   setLoaderMessage(null);
    // }
  };
  const handleDelete = async () => {
    try {
      await dispatch(
        deleteImageAsync({ albumId: data.albumId, imageId: data._id }),
      ).unwrap();
      navigate(-1);
      showToastSuccess("Image deleted successfully");
    } catch (err: any) {
      showToastError(err || "Failed to delete image");
    } finally {
    }
  };

  const handleAddComment = async (comment: string) => {
    try {
      await dispatch(
        addCommentToImageAsync({
          albumId: data.albumId,
          imageId: data._id,
          comment,
        }),
      ).unwrap();
      showToastSuccess("Comment added successfully");
    } catch (err: any) {
      showToastError(err || "Failed to add comment");
    }
  };

  return (
    <>
      <ImageDetail
        data={data}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
        onAddComment={handleAddComment}
        onBack={() => navigate(-1)}
        isOwner={isOwner}
      />
    </>
  );
};

export default ImageDetailContainer;
