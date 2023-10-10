import Head from 'next/head'

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
      <DevOrder />
    </main>
  </>
)

export default Home
