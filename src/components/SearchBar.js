import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from '@reach/router'
import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/core'

const SearchBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const { pathname } = location
    if (pathname.startsWith('/search/')) {
      const query = pathname.split('/')[2]
      setSearchQuery(decodeURI(query))
    } else {
      setSearchQuery('')
    }
  }, [location])

  /**
   * Some characters in a search query can break either @reach/router's routing
   * or the upstream Postgres query. This function removes those characters from
   * the search before navigating to the /search page.
   *
   * Problem characters:
   * % ? & # / \ ~
   */
  const sanitizeQuery = () => {
    return searchQuery.replace(/[%?&#/\\~]+/g, '')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const sanitizedQuery = sanitizeQuery()
    if (sanitizedQuery) {
      navigate(`/search/${sanitizedQuery}`)
    }
  }

  return (
    <Flex as='form' onSubmit={handleSearch} justify='space-between' flex={4}>
      <InputGroup w='full' mr={{ md: 4, lg: 8, xl: 16 }}>
        <InputLeftElement children={<Icon name='search' color='gray.400' />} />
        <Input
          w='full'
          size='lg'
          type='text'
          fontSize='md'
          variant='filled'
          placeholder='Search'
          value={searchQuery}
          _hover={{ bg: 'gray.100' }}
          _focus={{ bg: 'gray.100' }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </Flex>
  )
}

export default SearchBar
