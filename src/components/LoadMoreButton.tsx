import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, disabled }) => (
  <div className="text-center">
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      {disabled ? 'Loading...' : 'Load More'}
    </button>
  </div>
);

export default LoadMoreButton;