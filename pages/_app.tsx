/* eslint-disable react/jsx-props-no-spreading */
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Component {...pageProps} />
    </Navbar>
  )
}

export default MyApp
