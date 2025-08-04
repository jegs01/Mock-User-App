import React from 'react';
import { User } from '../types';

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => (
  <div
    key={user.id}
    onClick={onClick}
    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
  >
    <img
      src={user.picture.large}
      alt={user.fullName}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
      <p className="text-sm text-gray-600 truncate">{user.email}</p>
      <p className="text-sm text-gray-500">
        {user.location.city}, {user.location.country}
      </p>
    </div>
  </div>
);

export default UserCard;