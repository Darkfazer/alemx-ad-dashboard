// src/utils/aiService.js
export const AIService = {
  async generateAdCopy(prompt) {
    // Mock implementation (replace with real API call if needed)
    const mockResponses = [
      "Boost your sales with our limited-time offer! 🚀",
      "Engage your audience with this eye-catching promotion! ✨",
      "Convert more leads with this high-performing ad! 💰",
      "Stand out from competitors with this creative campaign! 🏆"
    ];
    
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