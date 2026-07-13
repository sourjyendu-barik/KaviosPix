import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/albumHooks";
import { fetchAlbumsAsyn } from "./album";
import DashBoardFilter from "./DashboardSections/DashBoardFilter";
import AlbumsPage from "./AlbumCard/AlbumPage";
import Loader from "../../components/Loader";

type FilterTab = "all" | "personal" | "shared";

export default function AlbumList() {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.albums);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchAlbumsAsyn());
    }
  }, [dispatch, data.length]);

  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  if (status === "loading") return <Loader message="Loading albums" />;
  if (status === "error") return <p>Error: {error}</p>;

  // Filter logic
  const filteredAlbums = data.filter((album) => {
    const isShared = album.sharedWith && album.sharedWith.length > 0;

    if (activeTab === "personal") return !isShared;
    if (activeTab === "shared") return isShared;

    return true;
  });

  return (
    <>
      <DashBoardFilter activeTab={activeTab} setActiveTab={setActiveTab} />

      {filteredAlbums.length > 0 ? (
        <div className="animate-scale-up">
          <AlbumsPage albums={filteredAlbums} />
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No albums found</p>
      )}
    </>
  );
}
