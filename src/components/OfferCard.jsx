import React from 'react'
import PropTypes from 'prop-types'
import { Box, Image, Badge, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Stars } from './Stars'
import placeholder from '../assets/placeholder.png'

const CH_MIN_WIDTH = '3xs'

export const OfferCard = ({
  destination,
  imageUrl,
  imageAlt = destination,
  nights,
  formattedPrice,
  reviewCount,
  rating,
  isNew,
  linkTo,
}) => {
  return (
    <LinkBox
      maxW="sm"
      minW={CH_MIN_WIDTH}
      borderRadius="md"
      overflow="hidden"
      role="group"
      shadow="base"
      transition="box-shadow .2s ease-in-out"
      _hover={{
        shadow: 'lg',
      }}
    >
      <Box overflow="hidden">
        <Image
          src={imageUrl}
          fallbackSrc={placeholder}
          alt={imageAlt}
          transition="transform .2s ease-out"
          _groupHover={{ transform: 'scale(1.1)' }}
        />
      </Box>

      <Box p="4">
        <Box d="flex" alignItems="baseline">
          {isNew && (
            <Badge borderRadius="full" px="2" colorScheme="teal" mr="2">
              New
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {nights} nights
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          <LinkOverlay as={Link} to={linkTo}>
            {destination}
          </LinkOverlay>
        </Box>

        <Box>{formattedPrice}</Box>

        <Box d="flex" mt="2" alignItems="center">
          <Stars filledCount={rating} />
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </LinkBox>
  )
}

OfferCard.propTypes = {
  destination: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  nights: PropTypes.number.isRequired,
  formattedPrice: PropTypes.string.isRequired,
  reviewCount: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  isNew: PropTypes.bool,
  linkTo: PropTypes.string.isRequired,
}

OfferCard.minWidth = CH_MIN_WIDTH
