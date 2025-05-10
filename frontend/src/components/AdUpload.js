// src/components/AdUpload.js
import { useState } from 'react';
import {
  Box,
  Button,
  Textarea,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useToast,
  Flex,
  Spinner
} from '@chakra-ui/react';
import { AIService } from '../utils/aiService';

const AdUpload = ({ onAdCopyGenerated }) => {
  const [adCopy, setAdCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const toast = useToast();

  const handleGenerateCopy = async () => {
    setIsGenerating(true);
    try {
      const result = await AIService.generateAdCopy("product description");
      if (result.success) {
        setAdCopy(result.copy);
        onAdCopyGenerated?.(result.copy);
        toast({
          title: 'Ad copy generated!',
          status: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: 'Please try again later',
        status: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGetPerformance = async () => {
    setIsLoadingStats(true);
    try {
      const data = await AIService.getAdPerformance('mock-id');
      setPerformanceData(data);
    } catch (error) {
      toast({
        title: 'Failed to load stats',
        status: 'error',
      });
    } finally {
      setIsLoadingStats(false);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Textarea
        value={adCopy}
        onChange={(e) => setAdCopy(e.target.value)}
        placeholder="Enter your ad copy here..."
        mb={4}
        minH="120px"
      />
      
      <Flex gap={3} mb={6}>
        <Button
          onClick={handleGenerateCopy}
          colorScheme="teal"
          leftIcon={<AiIcon />}
          isLoading={isGenerating}
          loadingText="Generating..."
        >
          Generate AI Ad Copy
        </Button>
        
        <Button
          onClick={handleGetPerformance}
          variant="outline"
          isLoading={isLoadingStats}
        >
          Simulate Analytics
        </Button>
      </Flex>

      {performanceData && (
        <StatGroup borderTop="1px solid" borderColor="gray.100" pt={4}>
          <Stat>
            <StatLabel>Impressions</StatLabel>
            <StatNumber>{performanceData.impressions.toLocaleString()}</StatNumber>
          </Stat>
          
          <Stat>
            <StatLabel>Clicks</StatLabel>
            <StatNumber>{performanceData.clicks}</StatNumber>
            <StatHelpText>CTR: {performanceData.ctr}</StatHelpText>
          </Stat>
          
          <Stat>
            <StatLabel>Engagement</StatLabel>
            <StatNumber>{performanceData.engagement}</StatNumber>
          </Stat>
        </StatGroup>
      )}
    </Box>
  );
};

// Simple AI icon component
const AiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
  </svg>
);

export default AdUpload;