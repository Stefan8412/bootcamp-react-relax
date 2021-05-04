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
} from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { Offer } from '../components/Offer'
import { Header } from './components/Header'
import { useFetch } from '../hooks'

export const Offers = () => {
  const [searchTerm, setSearchTerm] = React.useState('')

  const { data: rawOffers, isLoading } = useFetch('http://localhost:3004/offers?_limit=12')

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
      <Container maxWidth="container.xl">
        <Grid gridTemplateColumns={['auto', '15rem auto']} gap="4" py="4">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={AiOutlineSearch} color="gray.300" />
            </InputLeftElement>
            <Input type="search" placeholder="Search offers" onChange={handleSearch} />
          </InputGroup>
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
            <Box>
              <Box py="2">
                <Text>{offers.length} offers found</Text>
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
            </Box>
          )}
        </Grid>
      </Container>
    </>
  )
}
