import React, { useEffect, useState } from 'react';

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('campaigns') || '[]');
    setCampaigns(stored);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Campaign List</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns submitted.</p>
      ) : (
        <ul className="space-y-2">
          {campaigns.map((c, index) => (
            <li key={index} className="border p-2">
              <h3 className="font-bold">{c.name}</h3>
              <p>Date: {new Date(c.date).toLocaleString()}</p>
              <p>Status: {c.status}</p>
              <p>Age Range: {c.targeting.ageRange}</p>
              <p>Location: {c.targeting.location}</p>
              <p>Interests: {c.targeting.interests.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Campaigns;