import React from 'react'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/core'

import { useThings } from '../../contexts/ThingsContext'

const ThingsListSortDropdown = () => {
  const { sortBy, updateSortBy, sortOrderOptions } = useThings()

  return (
    <Menu closeOnSelect autoSelect={false}>
      <MenuButton as={Button} size='sm' mr={4} rightIcon='chevron-down'>
        Sort by: {sortBy.description}
      </MenuButton>
      <MenuList placement='bottom-end'>
        <MenuOptionGroup
          type='radio'
          defaultValue={sortBy.value}
          onChange={updateSortBy}
        >
          {sortOrderOptions.map((option) => (
            <MenuItemOption key={option.id} value={option.value}>
              {option.description}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default ThingsListSortDropdown
