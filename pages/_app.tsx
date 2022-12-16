import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app'

import 'styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default App
