import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Checkbox,
  CheckboxGroup,
  Tag,
  TagLabel,
  TagLeftIcon,
  Heading,
  useToast
} from '@chakra-ui/react';
import { FiGlobe, FiTarget, FiUser } from 'react-icons/fi';
import { CampaignService } from '../utils/campaignService';

const Targeting = ({ campaignData, onComplete }) => {
  const [ageRange, setAgeRange] = useState('18-24');
  const [location, setLocation] = useState('USA');
  const [interests, setInterests] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const campaign = {
        ...campaignData,
        targeting: { ageRange, location, interests },
        status: 'submitted',
        submittedAt: new Date().toISOString()
      };

      const result = await CampaignService.submitCampaign(campaign);
      
      if (result.success) {
        toast({
          title: 'Campaign Submitted',
          description: 'Your campaign is now under review',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onComplete?.(result.data);
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="md" mb={6}>
        Audience Targeting
      </Heading>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Age Range Selector */}
          <FormControl isRequired>
            <FormLabel display="flex" alignItems="center">
              <Tag variant="subtle" colorScheme="blue" mr={2}>
                <TagLeftIcon as={FiUser} />
                <TagLabel>Age Range</TagLabel>
              </Tag>
            </FormLabel>
            <Select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            >
              <option value="18-24">18-24</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45+">45+</option>
            </Select>
          </FormControl>

          {/* Location Input */}
          <FormControl isRequired>
            <FormLabel display="flex" alignItems="center">
              <Tag variant="subtle" colorScheme="green" mr={2}>
                <TagLeftIcon as={FiGlobe} />
                <TagLabel>Location</TagLabel>
              </Tag>
            </FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter target location"
            />
          </FormControl>

          {/* Interests Checkboxes */}
          <FormControl isRequired>
            <FormLabel display="flex" alignItems="center">
              <Tag variant="subtle" colorScheme="purple" mr={2}>
                <TagLeftIcon as={FiTarget} />
                <TagLabel>Interests</TagLabel>
              </Tag>
            </FormLabel>
            <CheckboxGroup
              value={interests}
              onChange={setInterests}
            >
              <Stack spacing={2}>
                {['Tech', 'Sports', 'Music', 'Fashion', 'Travel'].map((interest) => (
                  <Checkbox 
                    key={interest} 
                    value={interest}
                    colorScheme="purple"
                  >
                    {interest}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={4}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Complete Campaign
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Targeting;