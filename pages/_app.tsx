import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app'

import 'styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
)

export default App
