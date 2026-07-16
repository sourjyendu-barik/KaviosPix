import { useState } from "react";
import DashboardHeader from "./DashboardSections/DashboardHeader";
import AlbumList from "./AlbumList";
import AddNewAlbumModal from "./Modals/AddNewAlbumModal";
const Dashboard = () => {
  const [addAlbumModalOpen, setAddAlbumModalOpen] = useState(false);

  return (
    <>
      <div>
        <DashboardHeader
          onAddNewAlbumTrigger={() => setAddAlbumModalOpen(true)}
        />
        <AlbumList />
      </div>

      {/* Add Album Modal */}
      <AddNewAlbumModal
        isOpen={addAlbumModalOpen}
        onClose={() => setAddAlbumModalOpen(false)}
      />
    </>
  );
};

export default Dashboard;
