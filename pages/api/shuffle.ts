import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

import * as ShuffleController from 'src/controllers/ShuffleController'
import * as db from 'src/services/db'

type Data = {
  error?: string
  names?: string[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const session = await getSession(req, res)
    const { email, sub } = session?.user || {}

    const loggedInWithGoogle = (sub || '').startsWith('google')

    if (!loggedInWithGoogle) {
      throw new Error('Invalid session')
    }

    const isInvited = db.isUserInvited(email)

    if (!isInvited) {
      throw new Error('Invalid session')
    }

    const teamMembers = await ShuffleController.getNamesPermutation()

    res.status(200).json({ names: teamMembers })
  } catch (error) {
    let message = 'unknown'

    if (error instanceof Error) {
      message = error.message
    }

    res.status(500).json({ error: message })
  }
}

export default withApiAuthRequired(handler)
