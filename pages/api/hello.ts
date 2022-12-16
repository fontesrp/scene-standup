import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  other?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getSession(req, res)
    const { email } = session?.user || {}

    const allowedEmails = (process.env.ALLOWED_EMAILS || '').split(',')

    if (!allowedEmails.includes(email)) {
      throw new Error('Invalid session')
    }

    res.status(200).json({ name: 'success' })
  } catch (error) {
    let name = 'unknown'

    if (error instanceof Error) {
      name = error.message
    }

    res.status(500).json({ name })
  }
}

export default withApiAuthRequired(handler)
