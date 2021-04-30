import React from 'react'
import { Box, Button, Center, Heading, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import bg from '../assets/bg.jpg'

const Home = () => (
  <Box bg={`url('${bg}') center / cover no-repeat`} h="100vh">
    <Center h="100vh">
      <Stack spacing="4" align="center">
        <Heading size="3xl" color="gray.50">
          Welcome!
        </Heading>
        <Button as={Link} to="offers">
          See what's inside
        </Button>
      </Stack>
    </Center>
  </Box>
)

export default Home
