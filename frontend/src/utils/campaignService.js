export const CampaignStatus = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  ACTIVE: 'active',
  PAUSED: 'paused',
};

// LocalStorage service
const CAMPAIGNS_KEY = 'campaigns';

export const CampaignService = {
  async getCampaigns() {
    try {
      return JSON.parse(localStorage.getItem(CAMPAIGNS_KEY)) || [];
    } catch (error) {
      console.error('Error reading campaigns:', error);
      return [];
    }
  },

  async saveCampaign(campaign) {
    const campaigns = await this.getCampaigns();
    const existingIndex = campaigns.findIndex(c => c.id === campaign.id);
    
    if (existingIndex >= 0) {
      campaigns[existingIndex] = campaign; // Update existing
    } else {
      campaigns.push({ 
        ...campaign,
        id: crypto.randomUUID(), // or uuid/v4
        createdAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
    return campaign;
  },

  async submitCampaign(campaignData) {
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campaign = {
        ...campaignData,
        status: CampaignStatus.SUBMITTED,
        submittedAt: new Date().toISOString(),
      };

      await this.saveCampaign(campaign);
      
      // Log to console for debugging
      console.log('Campaign submitted:', campaign);
      
      return { success: true, data: campaign };
    } catch (error) {
      console.error('Submission failed:', error);
      return { success: false, error: 'Submission failed. Please try again.' };
    }
  }
};