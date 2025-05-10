import React, { useState } from 'react';

const submitCampaign = async (campaignData) => {
  const response = await fetch('http://localhost:5000/api/campaigns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campaignData)
  });
  return await response.json();
};

function AdUpload() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploaded:', file || url);
    window.location.href = '/targeting';
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Upload Ad Banner</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block" />
        <input
          type="text"
          placeholder="Or enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Continue</button>
      </form>
    </div>
  );
}

export default AdUpload;
