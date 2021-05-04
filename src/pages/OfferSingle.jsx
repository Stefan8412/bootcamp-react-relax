import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { Header } from './components/Header'
import { Stars } from '../components/Stars'

export const OfferSingle = () => {
  const [data, setData] = React.useState({})
  const { id } = useParams()

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3004/offers/${id}`)
        const result = await response.json()
        setData(result)
      }
      fetchData()
    } catch (e) {
      // do nothing
    }
  }, [id])

  return (
    <>
      <Header />
      <Image src={data.thumbnail} w="full" h="sm" objectFit="cover" />
      <Container maxWidth="container.md">
        <Box py="10">
          <Heading>
            {data.city}, {data.country}
          </Heading>
        </Box>
        <VStack alignItems="start">
          <HStack>
            <Box d="inline-flex">
              <Stars filledCount={data.rating} />
            </Box>
            <Text>{data.rating} / 5</Text>
          </HStack>
          {data.description?.split('\n').map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Text key={index}>{item}</Text>
          ))}
        </VStack>
      </Container>
    </>
  )
}
