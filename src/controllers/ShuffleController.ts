import { Connection } from 'mysql2'

import * as db from 'src/services/db'
import { shuffleInPlace } from 'src/services/util'

const maxStandupsStored = 15

const saveNewPermutation = async (
  connection: Connection,
  teamMembers: db.TeamMember[],
  prevStandups: db.StandupOrder[]
) => {
  // Don't keep the request hanging
  await Promise.resolve()

  if (prevStandups.length >= maxStandupsStored) {
    const oldest = prevStandups
      .sort(
        (prevStandup1, prevStandup2) =>
          prevStandup2.createdAt.getTime() - prevStandup1.createdAt.getTime()
      )
      .pop()

    if (oldest?.id) {
      await db.deleteStandupOrder(connection, oldest.id)
    }
  }

  await db.addStandupOrder(connection, teamMembers.map(teamMember => teamMember.id).join(','))
}

export const getNamesPermutation = async (): Promise<string[]> => {
  const connection = db.createConnection()

  const teamMembers = await db.getTeamMembers(connection)
  const prevStandups = await db.getStandupOrder(connection)

  let isDuplicate

  do {
    shuffleInPlace(teamMembers)
    const teamMembersIds = teamMembers.map(teamMember => teamMember.id).join(',')
    // The number of permutations must be greater than `maxStandupsStored`
    isDuplicate = prevStandups.some(prevStandup => prevStandup.teamMembersIds === teamMembersIds)
  } while (isDuplicate)

  saveNewPermutation(connection, teamMembers, prevStandups)

  return teamMembers.map(teamMember => teamMember.name)
}
