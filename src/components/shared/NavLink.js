import React from 'react'
import { Link } from '@reach/router'

/**
 * A clone of `react-router`'s <NavLink /> component. Used when wanting to
 * highlight app-specific links.
 * @see https://reach.tech/router/example/active-links
 */
const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? '#ff4500' : '#333',
        },
      }
    }}
  />
)

export default NavLink
