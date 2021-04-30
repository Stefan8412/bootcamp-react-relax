import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@chakra-ui/react'
import { Link, useMatch } from 'react-router-dom'

export const NavLink = ({ to, ...rest }) => {
  const match = useMatch(to)
  return <Button size="sm" as={Link} to={to} variant="ghost" isActive={!!match} {...rest} />
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
}
