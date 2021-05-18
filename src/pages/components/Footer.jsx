import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Container } from '../../components/Container'

export const Footer = () => {
  return (
    <Box bg="gray.700">
      <Container py="4">
        <Text color="whiteAlpha.500" textAlign="center">
          © {new Date().getFullYear()} {import.meta.env.VITE_AUTHOR_NAME}
        </Text>
      </Container>
    </Box>
  )
}
