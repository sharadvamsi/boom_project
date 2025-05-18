import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !video) {
      toast.error('Title and video are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('video', video);

      await API.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Video uploaded successfully!');
      setTitle('');
      setVideo(null);
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Upload a Video</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded border-amber-100"
        />
        <input
  type="file"
  accept="video/mp4"
  onChange={(e) => setVideo(e.target.files[0])}
  className="w-full text-sm text-gray-700 bg-gray-100 border border-gray-300  p-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
/>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
