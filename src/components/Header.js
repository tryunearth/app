import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/core'

import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()
  const show = false

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      py={2}
      px={24}
      borderBottom='1px'
      borderBottomStyle='solid'
      borderBottomColor='gray.200'
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='lg'>
          Unearth
          <Badge ml={1} variant='subtle' variantColor='orange'>
            beta
          </Badge>
        </Heading>
      </Flex>

      {/* <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}> */}
      <Box display={{ sm: 'block', md: 'none' }}>
        <svg
          fill='white'
          width='12px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </Box>

      {/* <Box
          display={{ sm: show ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', md: 'auto' }}
          alignItems='center'
          flexGrow={1}
        >
          <MenuItems>Docs</MenuItems>
          <MenuItems>Examples</MenuItems>
          <MenuItems>Blog</MenuItems>
        </Box> */}

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Menu>
          <MenuButton as='button'>
            <Avatar name={user.username} src='https://bit.ly/dan-abramov' />
          </MenuButton>
          <MenuList placement='bottom-end'>
            <MenuGroup title={`Hello, ${user.username}`}>
              <MenuItem>Account</MenuItem>
              <MenuItem>Preferences</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default Header
