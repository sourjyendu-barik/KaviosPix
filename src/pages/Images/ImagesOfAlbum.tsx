import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { viewImagesOfAlbum } from "../../api";
import ImageCard from "../../components/ImageCard";
import Loader from "../../components/Loader";
import AlbumHeader from "../../components/AlbumHeader";
const ImagesOfAlbum = () => {
  const { albumId } = useParams();
  const location = useLocation();
  const { name, description } = location.state;
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!albumId) return;

    const fetchImages = async () => {
      try {
        setLoading(true);

        const res = await viewImagesOfAlbum(albumId);
        setImages(res?.data?.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [albumId]);

  //   const handleDetailClick = (image: any) => {
  //     navigate(`/image/${image._id}`, { state: { image } });
  //   };

  if (loading) return <Loader message="Loading..." />;

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div>
      <AlbumHeader name={name} description={description} />

      <div className="px-4 pb-6">
        {images.length === 0 ? (
          <p className="text-gray-500 text-sm">No images found.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {images.map((image: any) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesOfAlbum;
