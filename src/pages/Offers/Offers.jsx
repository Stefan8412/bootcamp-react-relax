import React from 'react'
import { differenceInMonths } from 'date-fns'
import {
  Box,
  Center,
  Checkbox,
  Container,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react'
import { AiFillCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import { uniqBy, sortBy, flowRight, identity } from 'lodash-es'
import { OfferCard } from '../../components/OfferCard'
import { useFetch } from '../../hooks'
import bg from '../../assets/bg.jpg'

const isNew = (date) => differenceInMonths(new Date(), new Date(date)) < 6

const initialActiveFilters = {
  newOnly: false,
  country: 'all',
}

const filterByNew = (offers) => offers.filter(({ createdAt }) => isNew(createdAt))
const filterByCountry = (country) => (offers) => offers.filter((offer) => offer.country === country)

export const Offers = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [activeFilters, setActiveFilters] = React.useState(initialActiveFilters)
  const { data: rawOffers, isLoading } = useFetch('http://localhost:3004/offers?_limit=30')
  const offerMinWidth = useToken('sizes', OfferCard.minWidth)

  // maybe `useMemo`
  const offers = searchTerm
    ? rawOffers.filter(({ country, city }) => (city + country).toLowerCase().includes(searchTerm))
    : rawOffers

  /**
   * TODO: build incrementally
   * compose (Lodash's `flowRight`) example
   * const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
   * TODO: maybe `useMemo`
   */
  const filteredOffers = flowRight(
    activeFilters.newOnly ? filterByNew : identity,
    activeFilters.country !== 'all' ? filterByCountry(activeFilters.country) : identity
  )(offers)

  return (
    <>
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
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                }}
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
          <Stack spacing="4" py="4">
            <Text fontWeight="bold" textTransform="uppercase">
              Filters
            </Text>
            <Checkbox
              onChange={(e) =>
                setActiveFilters((prevState) => ({ ...prevState, newOnly: e.target.checked }))
              }
            >
              New only
            </Checkbox>
            <Text fontWeight="bold" textTransform="uppercase" fontSize="small">
              Filter by country
            </Text>
            <RadioGroup
              onChange={(country) => setActiveFilters((prevState) => ({ ...prevState, country }))}
              value={activeFilters.country}
            >
              <SimpleGrid gap="2">
                <Radio value="all">All</Radio>
                {sortBy(
                  uniqBy(offers, ({ country }) => country),
                  ({ country }) => country
                ).map(({ id, country }) => (
                  <Radio key={id} value={country}>
                    {country}
                  </Radio>
                ))}
              </SimpleGrid>
            </RadioGroup>
          </Stack>
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
            <Stack spacing="4" py="4">
              <Text fontSize="sm" color="gray">
                {filteredOffers.length === 1 ? '1 offer' : `${filteredOffers.length} offers`} found
              </Text>
              <Grid
                gridTemplateColumns={`repeat(auto-fill, minmax(${offerMinWidth}, 1fr));`}
                gap={4}
              >
                {filteredOffers.map(
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
                    <OfferCard
                      key={id}
                      destination={`${city}, ${country}`}
                      imageUrl={thumbnail}
                      formattedPrice={new Intl.NumberFormat('sk', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      }).format(price)}
                      rating={rating}
                      linkTo={String(id)}
                      nights={nights}
                      isNew={isNew(createdAt)}
                      reviewCount={reviewCount}
                    />
                  )
                )}
              </Grid>
            </Stack>
          )}
        </Grid>
      </Container>
    </>
  )
}
