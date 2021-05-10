import React from 'react'
import { Box, Button, Center, Heading, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'

export const Home = () => (
  <Box bg={`url('${bg}') center / cover no-repeat`} h="100vh">
    <Center h="100vh">
      <Stack spacing="8" align="center">
        <Heading size="3xl" color="gray.50" textAlign="center">
          Welcome <br />
          to React Relax!
        </Heading>
        <Button as={Link} to="offers" colorScheme="green" size="lg" shadow="dark-lg">
          Ready for something new?
        </Button>
      </Stack>
    </Center>
  </Box>
)
