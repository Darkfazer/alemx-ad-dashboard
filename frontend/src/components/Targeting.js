import React, { useState } from 'react';

function Targeting() {
  const [ageRange, setAgeRange] = useState('18-24');
  const [location, setLocation] = useState('USA');
  const [interests, setInterests] = useState([]); 
  
  const handleCheckbox = (value) => {
    setInterests(prev =>
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const campaign = {
      name: 'Campaign ' + new Date().toLocaleString(),
      date: new Date().toISOString(),
      status: 'Submitted',
      targeting: { ageRange, location, interests },
    };
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    window.location.href = '/campaigns';
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Audience Targeting</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <select value={ageRange} onChange={(e) => setAgeRange(e.target.value)} className="border p-2 w-full">
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
        <div>
          <label className="block">Select Interests:</label>
          {['Tech', 'Sports', 'Music'].map((interest) => (
            <label key={interest} className="block">
              <input
                type="checkbox"
                value={interest}
                checked={interests.includes(interest)}
                onChange={() => handleCheckbox(interest)}
              />{' '}
              {interest}
            </label>
          ))}
        </div>
        <button type="submit" className="bg-purple-500 text-white px-4 py-2">Submit Campaign</button>
      </form>
    </div>
  );
}

export default Targeting;