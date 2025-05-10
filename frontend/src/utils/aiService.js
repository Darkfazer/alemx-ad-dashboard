// src/utils/aiService.js
export const AIService = {
  async generateAdCopy(prompt) {
const mockGenerateAdCopy = async (prompt) => {
  const mockResponses = [/*...*/];
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { 
    success: true, 
    copy: mockResponses[Math.floor(Math.random() * mockResponses.length)] 
  };
};

// Real OpenAI API Service (enable via environment variable)
const realGenerateAdCopy = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: `Generate compelling ad copy about: ${prompt}. Keep it under 120 characters.`
      }],
      temperature: 0.7
    })
  });
  const data = await response.json();
  return {
    success: true,
    copy: data.choices[0]?.message?.content || "Could not generate copy"
  };
};


export const AIService = {
  generateAdCopy: process.env.REACT_APP_USE_REAL_AI === 'true' 
    ? realGenerateAdCopy 
    : mockGenerateAdCopy,
  
  // Keep the mock analytics regardless
  getAdPerformance: async () => { /*...*/ }
};
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      copy: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      generatedAt: new Date().toISOString()
    };
  },

  async getAdPerformance(campaignId) {
    // Mock analytics data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      impressions: Math.floor(Math.random() * 5000) + 1000,
      clicks: Math.floor(Math.random() * 500) + 50,
      ctr: (Math.random() * 10).toFixed(2) + '%',
      engagement: Math.floor(Math.random() * 30) + 10 + '%'
    };
  }
};