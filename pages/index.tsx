import Head from 'next/head'
import Link from 'next/link'

import DevOrder from 'src/components/DevOrder'
import Profile from 'src/components/Profile'

const Home = () => (
  <>
    <Head>
      <title>Scene standup</title>
    </Head>
    <main>
      <header>
        <Profile />
      </header>
      <Link href="/api/auth/login">Login</Link>
      <DevOrder />
    </main>
  </>
)

export default Home
