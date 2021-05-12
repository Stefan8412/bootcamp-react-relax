import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

export const Footer = () => {
  return (
    <Box bg="gray.700">
      <Container maxWidth="container.xl" py="4">
        <Text color="whiteAlpha.500" textAlign="center">
          Created by {import.meta.env.VITE_AUTHOR_NAME}
        </Text>
      </Container>
    </Box>
  )
}
