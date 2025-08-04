import React from 'react';
import { User } from '../types';

interface UserModalProps {
  user: User;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
      >
        &times;
      </button>
      <img
        src={user.picture.large}
        alt={user.fullName}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
      />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        {user.fullName}
      </h2>
      <p className="text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-600 mb-1">
        <strong>Street:</strong> {user.location.street.number} {user.location.street.name}
      </p>
      <p className="text-gray-600 mb-1">{user.location.city}, {user.location.state}, {user.location.country}</p>
      <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
    </div>
  </div>
);

export default UserModal;