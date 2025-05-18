import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const currentlyPlayingRef = useRef(null); // Track the currently playing video

  const fetchVideos = async () => {
    try {
      const res = await API.get('/videos');
      setVideos(res.data);
    } catch (err) {
      toast.error('Failed to load videos');
    }
  };

  const handleLike = async (videoId) => {
    try {
      await API.post(`/like/${videoId}`);
      setVideos((prev) =>
        prev.map((v) =>
          v._id === videoId ? { ...v, likes: v.likes + 1 } : v
        )
      );
    } catch {
      toast.error('Like failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out');
    navigate('/');
  };

  const handlePlay = (videoElement) => {
    if (currentlyPlayingRef.current && currentlyPlayingRef.current !== videoElement) {
      currentlyPlayingRef.current.pause();
    }
    currentlyPlayingRef.current = videoElement;
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="relative p-4">
      {/* Top-right controls */}
      <div className="absolute top-4 right-4 flex gap-4 items-center">
        {!token ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login / Signup
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/upload')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Upload
            </button>
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <img
                  src="https://res.cloudinary.com/ddgnliekv/image/upload/v1743913580/mxp6sjrtqy7zpye6muiv.jpg"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded w-32 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Video grid */}
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <video
              src={`http://localhost:5000/${video.filePath}`}
              controls
              className="w-full h-60 object-cover"
              onPlay={(e) => handlePlay(e.target)}
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <button
                onClick={() => handleLike(video._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                ❤️ {video.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
