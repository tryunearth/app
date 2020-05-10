import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Text,
  Collapse,
  List,
  ListItem,
  Icon,
  Stack,
  useDisclosure,
} from '@chakra-ui/core'

import { NavLink } from '../components'

const FilterCollapse = ({ label, prefix, list }) => {
  const { isOpen, onToggle } = useDisclosure()

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
          <Icon
            name={isOpen ? 'feather-chevron-down' : 'feather-chevron-right'}
          />
          <Text>{label}</Text>
        </Stack>
      </Box>
    )
  }

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
        <Icon
          name={isOpen ? 'feather-chevron-down' : 'feather-chevron-right'}
        />
        <Text>{label}</Text>
      </Stack>
      <Collapse isOpen={isOpen}>
        <List>
          {list.map((filterItem) => (
            <ListItem key={filterItem.id ? filterItem.id : filterItem.name}>
              <NavLink to={`/${prefix}/${filterItem.name}`}>
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
