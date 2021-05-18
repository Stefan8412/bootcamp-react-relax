import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Container,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import bg from '../../assets/bg.jpg'

export const SearchHeader = ({ onSearchChange, searchTerm, onClearSearch }) => {
  return (
    <Box bg={`url('${bg}') center / cover no-repeat`}>
      <Box bg="blackAlpha.700" py="20">
        <VStack as={Container} spacing="10">
          <Heading size="2xl" color="white" textAlign="center">
            Find your next adventure
          </Heading>
          <InputGroup maxW="md">
            <InputLeftElement pointerEvents="none" h="full">
              <Icon as={AiOutlineSearch} color="gray.300" boxSize="6" />
            </InputLeftElement>
            <Input
              type="search"
              size="lg"
              placeholder="here"
              color="white"
              borderColor="whiteAlpha.500"
              onChange={onSearchChange}
              value={searchTerm}
            />
            {searchTerm && (
              <InputRightElement h="full">
                <IconButton
                  aria-label="Clear search term"
                  variant="unstyled"
                  d="flex"
                  icon={<AiFillCloseCircle />}
                  color="gray.300"
                  onClick={onClearSearch}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </VStack>
      </Box>
    </Box>
  )
}

SearchHeader.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onClearSearch: PropTypes.func.isRequired,
}
