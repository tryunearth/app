import React from 'react'
import {
  Box,
  Text,
  Collapse,
  List,
  ListItem,
  ListIcon,
  Stack,
  useDisclosure,
} from '@chakra-ui/core'

import { NavLink } from '../components'

const FilterCollapse = ({ title, list }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box pl={2}>
      <Stack
        minH='40px'
        isInline
        justify='flex-start'
        align='center'
        onClick={onToggle}
        cursor='pointer'
      >
        <ListIcon
          size='12px'
          icon='triangle-down'
          style={isOpen ? {} : { transform: 'rotate(-90deg)' }}
        />
        <Text>{[title[0].toUpperCase(), ...title.substring(1)].join('')}</Text>
      </Stack>
      <Collapse isOpen={isOpen}>
        <List>
          {list.map((filterItem) => (
            <ListItem key={filterItem.id ? filterItem.id : filterItem.name}>
              <NavLink to={`${title}/${filterItem.name}`}>
                {filterItem.name}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}

export default FilterCollapse
