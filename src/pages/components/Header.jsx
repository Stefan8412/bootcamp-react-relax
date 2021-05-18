import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaLuggageCart, FaPercentage, FaSun, FaUser } from 'react-icons/fa'
import { Box, HStack, Icon, keyframes, Stack, Text } from '@chakra-ui/react'
import { NavLink } from './NavLink'
import { AuthContext } from './AuthProvider'
import { Container } from '../../components/Container'

const spinAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

export const Header = () => {
  const { user } = useContext(AuthContext)
  return (
    <Box py="4" shadow="base">
      <Container display="flex" justifyContent="space-between" alignItems="center">
        <HStack as={Link} to="/">
          <Icon as={FaSun} color="gray.600" animation={`8s ${spinAnimation} linear infinite`} />
          <Text as="span" fontWeight="bold">
            React & Relax
          </Text>
        </HStack>
        <Stack direction="row">
          <NavLink to="/offers" leftIcon={<Icon as={FaPercentage} color="gray.600" />}>
            Offers
          </NavLink>
          <NavLink to="/cart" leftIcon={<Icon as={FaLuggageCart} color="gray.600" />}>
            Cart
          </NavLink>
          <NavLink
            to="/account"
            colorScheme={user.name ? 'green' : undefined}
            leftIcon={<Icon as={FaUser} color="gray.600" />}
          >
            {user.name || 'Account'}
          </NavLink>
        </Stack>
      </Container>
    </Box>
  )
}
