import React, { useState, useEffect } from 'react'
import { Link, useLocation } from '@reach/router'
import { PseudoBox, Flex, Icon } from '@chakra-ui/core'

/**
 * A clone of `react-router`'s <NavLink /> component. Used when wanting to
 * highlight app-specific links.
 * @see https://reach.tech/router/example/active-links
 */
const NavLink = ({ icon, children, ...rest }) => {
  const location = useLocation()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsActive(location.pathname === rest.to)
  }, [location, rest.to])

  return (
    <PseudoBox
      d='flex'
      justifyContent='flex-start'
      alignItems='stretch'
      width='full'
      height={10}
      pl={icon ? 2 : 4}
      color={isActive ? 'orange.700' : 'gray.700'}
      bg={isActive ? 'orange.100' : 'transparent'}
      borderRadius='md'
      cursor='pointer'
      _hover={{ color: 'orange.700' }}
    >
      <Link {...rest} style={{ display: 'flex', width: '100%' }}>
        <Flex d='flex' justifyContent='flex-start' alignItems='center'>
          {icon && <Icon size={4} name={icon} mr={2} />}
          {children}
        </Flex>
      </Link>
    </PseudoBox>
  )
}

export default NavLink
