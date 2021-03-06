import React from 'react';
import {
  Box, Heading, Text, Button,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-location';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, purple.400, purple.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="24px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you are looking for does not seem to exist
      </Text>

      <Button
        colorScheme="purple"
        bgGradient="linear(to-r, purple.400, purple.500, purple.600)"
        color="white"
        variant="solid"
        onClick={() => navigate({ to: '/', replace: true })}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
