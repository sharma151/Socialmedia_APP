import React, { useEffect } from "react";

/**
 * A reusable Modal component.
 *
 * Props:
 * - isOpen: boolean to control visibility
 * - onClose: function called to request closing the modal
 * - children: the content to render inside the modal
 */
export default function Modal({ isOpen, onClose, children }) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg max-w-[85%] w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
