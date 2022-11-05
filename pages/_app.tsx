/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import '../styles/globals.css'

function Layout({ children }: { children: ReactElement }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
      }}
    >
      {children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
