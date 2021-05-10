import React from 'react'
import { differenceInMonths } from 'date-fns'
import {
  Box,
  Icon,
  Grid,
  Container,
  Text,
  Input,
  InputLeftElement,
  InputGroup,
  useToken,
  Spinner,
  Center,
  Heading,
  VStack,
  InputRightElement,
  IconButton,
  Badge,
} from '@chakra-ui/react'
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import { Offer } from '../../components/Offer'
import { Header } from '../components/Header'
import { useFetch } from '../../hooks'
import bg from '../../assets/bg.jpg'

export const Offers = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const { data: rawOffers, isLoading } = useFetch('http://localhost:3004/offers?_limit=24')

  const offerMinWidth = useToken('sizes', Offer.minWidth)

  const handleSearch = React.useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const offers = React.useMemo(() => {
    return searchTerm
      ? rawOffers.filter(({ country, city }) => (country + city).toLowerCase().includes(searchTerm))
      : rawOffers
  }, [searchTerm, rawOffers])

  return (
    <>
      <Header />
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
                onChange={handleSearch}
                value={searchTerm}
              />
              {searchTerm && (
                <InputRightElement h="full">
                  <IconButton
                    variant="unstyled"
                    as={AiFillCloseCircle}
                    color="gray.300"
                    boxSize="6"
                    onClick={() => setSearchTerm('')}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </VStack>
        </Box>
      </Box>
      <Container maxWidth="container.xl">
        <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4">
          <Center h="12">
            <Badge colorScheme="red">TODO: filters</Badge>
          </Center>
          {isLoading ? (
            <Center height="100vh">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <div>
              <Box h="12" d="flex" alignItems="center">
                <Text fontSize="sm" color="gray">
                  {offers.length} offers found
                </Text>
              </Box>
              <Grid
                gridTemplateColumns={`repeat(auto-fill, minmax(${offerMinWidth}, 1fr));`}
                gap={4}
              >
                {offers.map(
                  ({
                    id,
                    country,
                    city,
                    nights,
                    thumbnail,
                    createdAt,
                    price,
                    rating,
                    reviewCount,
                  }) => (
                    <Offer
                      destination={`${city}, ${country}`}
                      imageUrl={thumbnail}
                      formattedPrice={`$${price}`}
                      rating={rating}
                      linkTo={String(id)}
                      nights={nights}
                      isNew={differenceInMonths(new Date(), new Date(createdAt)) < 6}
                      reviewCount={reviewCount}
                    />
                  )
                )}
              </Grid>
            </div>
          )}
        </Grid>
      </Container>
    </>
  )
}
