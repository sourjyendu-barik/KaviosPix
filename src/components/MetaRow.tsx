const MetaRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex gap-3">
    <div className="text-gray-400 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  </div>
);
export default MetaRow;
