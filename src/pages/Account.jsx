import React, { useContext } from 'react'
import { Button, Center, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { Header } from './components/Header'
import { SignUpForm } from './components/SignUpForm'
import { AuthContext } from './components/AuthProvider'

const Account = () => {
  const { user, logOut } = useContext(AuthContext)
  const isLoggedIn = !!user.name
  return (
    <>
      <Header />
      <Container>
        <Center minH="100vh">
          <Center shadow="xl" p="10" rounded="base" maxW="sm" w="full">
            {isLoggedIn ? (
              <VStack>
                <Heading size="md">Logged-in user:</Heading>
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
              </VStack>
            ) : (
              <SignUpForm />
            )}
          </Center>
        </Center>
      </Container>
    </>
  )
}

export { Account }
