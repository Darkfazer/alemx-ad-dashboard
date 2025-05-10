// src/utils/aiService.js

const MOCK_RESPONSES = [
  "Boost sales with our amazing product!",
  "Try it now - limited time offer!",
  "The solution you've been waiting for",
  "Transform your business today"
];

const mockGenerateAdCopy = async (prompt) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { 
    success: true, 
    copy: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
    generatedAt: new Date().toISOString()
  };
};

const realGenerateAdCopy = async (prompt) => {
  try {
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
        temperature: 0.7,
        max_tokens: 120
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      copy: data.choices[0]?.message?.content?.trim() || "Could not generate copy",
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    return {
      success: false,
      copy: "Error generating ad copy. Please try again.",
      generatedAt: new Date().toISOString()
    };
  }
};

export const AIService = {
  generateAdCopy: process.env.REACT_APP_USE_REAL_AI === 'true' 
    ? realGenerateAdCopy 
    : mockGenerateAdCopy,
  
  async getAdPerformance(campaignId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        impressions: Math.floor(Math.random() * 5000) + 1000,
        clicks: Math.floor(Math.random() * 500) + 50,
        ctr: (Math.random() * 10).toFixed(2) + '%',
        engagement: Math.floor(Math.random() * 30) + 10 + '%',
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Analytics Error:', error);
      return {
        success: false,
        error: "Failed to load performance data"
      };
    }
  }
};