import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from 'styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => (
  <>
    <Head>
      <title>Scene standup</title>
      <meta name="description" content="Standup order for PE pod" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <Link href="/api/auth/login">Login</Link>
      <Link href="/api/auth/logout">Logout</Link>
      <Link href="/profile">Profile</Link>
    </main>
  </>
)

export default Home
