import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Center, Icon, Text, VStack } from '@chakra-ui/react'
import { AiFillBug } from 'react-icons/ai'

export const ErrorMessage = ({ error }) => {
  return (
    <Center h="100vh">
      <VStack spacing="2">
        <Icon as={AiFillBug} boxSize="16" color="red" />
        <Text fontSize="4xl" fontWeight="black">
          Whoops!
        </Text>
        {import.meta.env.DEV ? (
          <Box as="pre" bg="red" rounded="md" w="full" maxW="xl" color="white" overflowX="auto">
            <Box p="4">
              <Text fontWeight="bold" mb="2">
                {error.name}: {error.message}
              </Text>
              <Text>{error.stack}</Text>
            </Box>
          </Box>
        ) : (
          <>
            <Text>There has been a critical bug in our app, our devs were notified!</Text>
            <Text>Sorry for the inconvenience</Text>
          </>
        )}
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </VStack>
    </Center>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    stack: PropTypes.string.isRequired,
  }).isRequired,
}
