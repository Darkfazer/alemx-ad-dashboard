import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) validateAndSetImage(selectedFile);
  };

  const handleURLChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setFile(null);
    setError('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) validateAndSetImage(droppedFile);
  };

  const validateAndSetImage = (image) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(image.type)) {
      setError('Please upload a valid image (JPEG, PNG, GIF)');
      setFile(null);
      setImageUrl('');
      return;
    }
    setError('');
    setFile(image);
    setImageUrl(URL.createObjectURL(image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bannerUrl = '';

    try {
      if (file) {
        const formData = new FormData();
        formData.append('banner', file);
        
        const response = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        bannerUrl = data.url;
      } else if (imageUrl) {
        if (!isValidUrl(imageUrl)) {
          setError('Please enter a valid URL');
          return;
        }
        bannerUrl = imageUrl;
      } else {
        setError('Please upload a file or enter a URL');
        return;
      }

      navigate('/targeting', { state: { bannerUrl } });
    } catch (err) {
      setError('File upload failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Upload Ad Banner</h2>
      
      <div
        className="border-2 border-dashed border-gray-400 p-8 text-center mb-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
          accept="image/jpeg, image/png, image/gif"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          Drag and drop your banner here or click to upload
        </label>
      </div>

      <p className="text-center mb-4">Or</p>

      <input
        type="text"
        placeholder="Enter image URL"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={imageUrl}
        onChange={handleURLChange}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Next: Targeting Options
      </button>

      {imageUrl && (
        <div className="mt-6 text-center">
          <h3 className="font-medium mb-2">Preview</h3>
          <img 
            src={imageUrl} 
            alt="Banner preview" 
            className="max-h-64 w-auto mx-auto rounded-lg shadow-md"
          />
        </div>
      )}
    </form>
  );
};

export default AdUpload;