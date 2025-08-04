import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import UserModal from './components/UserModal';
import LoadMoreButton from './components/LoadMoreButton';
import { User } from './types';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = process.env.REACT_APP_RANDOM_USER_API!;

  // Fetch fsers
  const fetchUsers = useCallback(async (append = false) => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Received non-JSON response:', text);
        throw new Error('API returned HTML or invalid content');
      }

      const data = await res.json();

      const newUsers: User[] = data.results.map((user: any) => ({
        ...user,
        id: user.login.uuid,
        fullName: `${user.name.first} ${user.name.last}`,
      }));

      setUsers(prev => append ? [...prev, ...newUsers] : newUsers);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      if (!append) {
        alert('Could not load users. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  // Filter users on search change
  useEffect(() => {
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleLoadMore = () => {
    if (loading || searchTerm) return;
    setLoading(true);
    fetchUsers(true);
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const isSearching = !!searchTerm;
  const noMatchingUsers = filteredUsers.length === 0 && !loading;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {loading && users.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} onClick={() => openModal(user)} />
                ))
              ) : noMatchingUsers ? (
                <p className="col-span-full text-center text-gray-500 py-6">
                  No users match your search. Try a different name.
                </p>
              ) : null}
            </div>

            <LoadMoreButton onClick={handleLoadMore} disabled={loading || isSearching} />

            {isSearching && (
              <p className="text-center text-sm text-gray-400 mt-2">
                Search is active. Clear to load more users.
              </p>
            )}
          </>
        )}
      </div>

      {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default App;