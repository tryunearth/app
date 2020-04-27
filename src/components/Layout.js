import React from 'react'

import { NavLink } from '../components'

const Layout = ({ filters, children }) => (
  <>
    {/* TODO - turn into Header */}
    <header>
      <nav style={{ display: 'flex' }}>
        <p>
          Unearth{' '}
          <span>
            <small>beta</small>
          </span>
        </p>
      </nav>
    </header>

    <main
      style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}
    >
      {/* TODO - turn into Sidebar */}
      <aside style={{ width: '250px', marginRight: '20px' }}>
        <h3>
          <NavLink to='/'>Home</NavLink>
        </h3>
        {Object.keys(filters).map((filter) => (
          <div key={filter}>
            <h3>
              {[filter[0].toUpperCase(), ...filter.substring(1)].join('')}
            </h3>
            <ul>
              {filters[filter].map((f) => (
                <li key={f.id ? f.id : f.name}>
                  <NavLink to={`${filter}/${f.name}`}>{f.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <section>{children}</section>
    </main>
  </>
)

export default Layout
