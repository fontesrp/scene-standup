import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as ShuffleController from 'src/controllers/ShuffleController'

type Data = {
  error?: string
  names?: string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getSession(req, res)
    const { email, sub } = session?.user || {}

    const allowedEmails = (process.env.ALLOWED_EMAILS || '').split(',')
    const loggedInWithGoogle = (sub || '').startsWith('google')

    if (!loggedInWithGoogle || !allowedEmails.includes(email)) {
      throw new Error('Invalid session')
    }

    const teamMembers = await ShuffleController.getNamesPermutation()

    res.status(200).json({ names: teamMembers })
  } catch (error) {
    let name = 'unknown'

    if (error instanceof Error) {
      name = error.message
    }

    res.status(500).json({ error: name })
  }
}

export default withApiAuthRequired(handler)
