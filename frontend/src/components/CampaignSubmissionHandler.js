import { useState } from 'react';
import { 
  Button, 
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Box
} from '@chakra-ui/react';
import { CampaignService } from '../utils/campaignService';

const CampaignSubmissionHandler = ({ campaignData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await CampaignService.submitCampaign(campaignData);
      
      if (result.success) {
        toast({
          title: 'Campaign Submitted',
          description: 'Your campaign has been successfully submitted for review',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onSuccess?.(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box mt={8}>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleSubmit}
        isDisabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" mr={2} />
            Submitting...
          </>
        ) : (
          'Submit Campaign'
        )}
      </Button>
    </Box>
  );
};

export default CampaignSubmissionHandler;