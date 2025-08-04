import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => (
  <div className="mb-8">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full max-w-md mx-auto px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default SearchBar;