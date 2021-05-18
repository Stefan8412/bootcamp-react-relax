import React, { useContext } from 'react'
import { Box, Button, Grid, Text } from '@chakra-ui/react'
import { SignUpForm } from './components/SignUpForm'
import { AuthContext } from './components/AuthProvider'
import { Container } from '../components/Container'

const Account = () => {
  const { user, logOut } = useContext(AuthContext)
  const isLoggedIn = !!user.name
  return (
    <Container h="full" d="flex" justifyContent="center" alignItems="center">
      <Box shadow="xl" p="10" rounded="base" maxW="sm" w="full">
        {isLoggedIn ? (
          <Grid gap="4">
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            <Button
              onClick={() => {
                logOut()
              }}
              colorScheme="red"
            >
              Log out
            </Button>
          </Grid>
        ) : (
          <SignUpForm />
        )}
      </Box>
    </Container>
  )
}

export { Account }
