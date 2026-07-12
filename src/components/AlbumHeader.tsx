const AlbumHeader = ({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) => {
  return (
    <div className="px-4 pt-6 pb-4">
      <h2 className="text-2xl font-bold text-gray-900">
        {name || "Total Images"}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        {description || "Your curated collection of automotive photography."}
      </p>
    </div>
  );
};

export default AlbumHeader;
