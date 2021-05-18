import React from 'react'
import { Container as ChakraContainer } from '@chakra-ui/react'

export const Container = (props) => {
  return <ChakraContainer maxWidth="container.xl" {...props} />
}
