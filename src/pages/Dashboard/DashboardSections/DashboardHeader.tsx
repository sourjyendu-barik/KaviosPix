import { Plus } from "lucide-react";
type DashBoardHeaderProps = {
  onAddNewAlbumTrigger: () => void;
};
const DashboardHeader: React.FC<DashBoardHeaderProps> = ({
  onAddNewAlbumTrigger,
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
      <div className="space-y-2">
        <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
          Albums
        </h1>
        <p className="font-sans text-base md:text-lg text-gray-text max-w-2xl leading-relaxed">
          Organize your visual legacy. Effortlessly manage personal memories and
          collaborative collections in one refined workspace.
        </p>
      </div>

      {/* Create Album button */}
      <button
        onClick={onAddNewAlbumTrigger}
        className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-sans text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-98 cursor-pointer shrink-0"
      >
        <Plus className="w-4 h-4" />
        Add new Album
      </button>
    </section>
  );
};

export default DashboardHeader;
