import React, { type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  subtitle?: string;
  closeOnBackdropClick?: boolean;
}

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
  subtitle,
  closeOnBackdropClick = true,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex-shrink-0 flex items-start justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex-1 pr-4">
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-900 leading-6"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
