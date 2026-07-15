import React, { useState } from "react";

interface CollaboratorAvatarsProps {
  sharedWith: string[];
}

const CollaboratorAvatars: React.FC<CollaboratorAvatarsProps> = ({
  sharedWith,
}) => {
  const [showEmails, setShowEmails] = useState(false);
  const displayEmails = sharedWith.slice(0, 2);
  const remainingCount = sharedWith.length > 2 ? sharedWith.length - 2 : 0;

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div
        className="flex -space-x-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowEmails((prev) => !prev);
        }}
      >
        {displayEmails.map((email) => (
          <div
            key={email}
            className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm flex-shrink-0"
            title={email}
          >
            {email.charAt(0).toUpperCase()}
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-gray-text shadow-sm flex-shrink-0">
            +{remainingCount}
          </div>
        )}
      </div>

      {showEmails && (
        <div
          className="absolute bottom-10 left-0 bg-white rounded-xl shadow-lg border border-border-subtle/60 py-2 px-3 min-w-[180px] max-w-[240px] z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-caption text-[10px] font-semibold text-gray-text uppercase tracking-wide mb-1.5">
            Shared with
          </p>
          <ul className="space-y-1 max-h-40 overflow-y-auto">
            {sharedWith.map((email) => (
              <li
                key={email}
                className="font-sans text-xs text-primary truncate"
                title={email}
              >
                {email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollaboratorAvatars;
