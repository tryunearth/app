import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Collapse,
  List,
  ListItem,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from '@chakra-ui/core'

import { NavLink, NavLinkIcon } from '../components'

const FilterCollapse = ({ label, prefix, list }) => {
  const { isOpen, onToggle } = useDisclosure()
  const [filterList, setFilterList] = useState([])
  const [value, setValue] = useState('')
  const handleChange = (event) => {
    setValue(event.target.value)
    setFilterList(
      [...list].filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase()),
      ),
    )
  }

  useEffect(() => setFilterList(list), [list])

  if (!list) {
    return (
      <Box pl={2} w='full'>
        <Stack
          minH='40px'
          isInline
          justify='flex-start'
          align='center'
          onClick={onToggle}
          cursor='pointer'
        >
          <NavLinkIcon name={isOpen ? 'bs-caret-down' : 'bs-caret-right'} />
          <Text>{label}</Text>
        </Stack>
      </Box>
    )
  }

  return (
    <Box pl={4} w='full'>
      <Stack
        minH='40px'
        isInline
        justify='flex-start'
        align='center'
        onClick={onToggle}
        cursor='pointer'
      >
        <NavLinkIcon
          name={isOpen ? 'bs-caret-down' : 'bs-caret-right'}
          marginRight={3}
        />
        <Text>{label}</Text>
      </Stack>
      <Collapse isOpen={isOpen}>
        <InputGroup mt={2} mb={4}>
          <InputLeftElement
            children={<Icon name='search' color='gray.300' />}
          />
          <Input
            type='text'
            placeholder=''
            value={value}
            onChange={handleChange}
            focusBorderColor='none'
          />
        </InputGroup>

        <List>
          {filterList.map((filterItem) => (
            <ListItem key={filterItem.id ? filterItem.id : filterItem.name}>
              <NavLink
                to={`/${prefix}/${filterItem.name}`}
                canBeDeleted={prefix === 'tags' ? true : false}
                item={filterItem}
              >
                {filterItem.name}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

FilterCollapse.defaultProps = { list: [] }

FilterCollapse.propTypes = {
  /** Label of the collapse, usually title-cased. */
  label: PropTypes.string.isRequired,
  /** URL pathname usually matching the label except lower-cased.  */
  prefix: PropTypes.string.isRequired,
  /** Array of objects representing the individual filter, e.g. a list of tags. */
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FilterCollapse
