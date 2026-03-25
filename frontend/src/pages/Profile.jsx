import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fetch fresh profile data from the protected API route
  const { data: profile, loading, error } = useFetch(userService.getProfile);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading) return <p className="text-center mt-16 text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center mt-16 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Profile</h2>
      <div className="space-y-3 text-gray-700">
        <p><span className="font-semibold">Name:</span> {profile?.name}</p>
        <p><span className="font-semibold">Email:</span> {profile?.email}</p>
        <p><span className="font-semibold">Member since:</span> {new Date(profile?.createdAt).toLocaleDateString()}</p>
      </div>
      <button
        onClick={() => { logout(); navigate('/'); }}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
