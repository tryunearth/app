import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from '@reach/router'
import { PseudoBox, Flex, IconButton } from '@chakra-ui/core'

import { useTagDeletionAlert } from '../../contexts/TagDeletionAlertContext'
import { NavLinkIcon } from '../../components'

/**
 * A clone of `react-router`'s <NavLink /> component. Used when wanting to
 * highlight app-specific links.
 * @see https://reach.tech/router/example/active-links
 */
const NavLink = ({ icon, canBeDeleted, item, children, ...rest }) => {
  const location = useLocation()
  const { handleOpen } = useTagDeletionAlert()
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsActive(decodeURI(location.pathname) === rest.to)
  }, [location, rest.to])

  return (
    <PseudoBox
      d='flex'
      justifyContent='flex-start'
      alignItems='stretch'
      width='full'
      height={10}
      pl={5}
      color={isActive ? 'blue.700' : 'gray.700'}
      bg={isActive ? 'blue.100' : 'transparent'}
      borderRadius='md'
      cursor='pointer'
      role='group'
      _hover={{ color: 'blue.700' }}
    >
      <Link
        {...rest}
        style={{ display: 'flex', width: '100%', outline: 'none' }}
      >
        <Flex
          w='full'
          pr={canBeDeleted ? 4 : 0}
          d='flex'
          justifyContent={canBeDeleted ? 'space-between' : 'flex-start'}
          alignItems='center'
        >
          {icon && <NavLinkIcon name={icon} />}
          {children}
          {canBeDeleted && (
            <PseudoBox
              display='none'
              color='red.400'
              _groupHover={{ display: 'block' }}
            >
              <IconButton
                icon='delete'
                variant='unstyled'
                display='flex'
                justifyContent='center'
                alignItems='center'
                _hover={{ color: 'red.600' }}
                onClick={(e) => {
                  e.preventDefault()
                  handleOpen(item)
                }}
              />
            </PseudoBox>
          )}
        </Flex>
      </Link>
    </PseudoBox>
  )
}

NavLink.defaultProps = {
  icon: null,
  item: null,
  canBeDeleted: false,
}

NavLink.propTypes = {
  icon: PropTypes.string,
  item: PropTypes.object,
  canBeDeleted: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default NavLink
