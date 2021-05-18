import * as React from 'react'

export const useFetch = (url) => {
  /**
   * We use `[]` here as an initial state to avoid checking for undefined everywhere `data` is manipulated
   * (array methods work on empty array, but not on undefined / null / ...)
   */
  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState()
  const [error, setError] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        setCount(response.headers.get('X-Total-Count'))
        const result = await response.json()
        setData(result)
        // eslint-disable-next-line no-shadow
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return {
    data,
    count,
    error,
    isLoading,
  }
}
