import { Pane, Tab, Tablist } from 'evergreen-ui'
import { useRouter } from 'next/router'
import React from 'react'

export default function Navbar({ children }: { children: React.ReactElement }) {
  const router = useRouter()

  interface NavItem {
    name: string
    location: string
  }

  const navItems: NavItem[] = [
    {
      name: 'Events',
      location: '/',
    },
    {
      name: 'Create',
      location: '/create',
    },
    {
      name: 'Register',
      location: '/register',
    },
    {
      name: 'Sign up',
      location: '/signup',
    },
    {
      name: 'Users',
      location: '/users',
    },
  ]

  return (
    <Pane display='flex' height={240}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {navItems.map((item) => (
          <Tab
            key={item.name}
            id={item.name}
            direction='vertical'
            onSelect={() => router.push(item.location)}
            aria-controls={`panel-${item.name}`}
          >
            {item.name}
          </Tab>
        ))}
      </Tablist>

      {children}
    </Pane>
  )
}
