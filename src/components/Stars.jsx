import React from 'react'
import { times } from 'lodash-es'
import { AiFillStar } from 'react-icons/ai'
import { Icon } from '@chakra-ui/react'

export const Stars = ({ starCount = 5, filledCount = 0 }) => {
  return times(starCount, (i) => (
    <Icon as={AiFillStar} key={i} color={i < filledCount ? 'teal.500' : 'gray.300'} />
  ))
}
