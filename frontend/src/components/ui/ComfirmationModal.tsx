// ConfirmationModal.tsx
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Confirm Deletion</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete your profile?</p>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={onConfirm}>Delete</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md dark:bg-gray-700 dark:text-gray-300" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
