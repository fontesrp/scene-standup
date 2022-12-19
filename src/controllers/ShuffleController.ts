import { Connection } from 'mysql2'

import * as db from 'src/services/db'
import { shuffleInPlace } from 'src/services/util'

const maxStandupsStored = 15

const saveNewPermutation = async (
  connection: Connection,
  teamMembers: db.TeamMember[],
  prevStandups: number[]
) => {
  // Don't keep the request hanging
  await Promise.resolve()

  if (prevStandups.length >= maxStandupsStored) {
    const oldestStandupId = await db.getOldestStandupId(connection)
    await db.deleteStandupOrders(connection, oldestStandupId)
    await db.deleteStandups(connection, oldestStandupId)
  }

  const newStandupId = await db.addStandups(connection)

  const values = teamMembers
    .map((teamMember, idx) =>
      [newStandupId, teamMember.id, idx].map(value => connection.escape(value)).join(',')
    )
    .map(values => `(${values})`)
    .join(',')

  await db.addStandupOrders(connection, values)
}

export const getNamesPermutation = async (connection: Connection): Promise<string[]> => {
  const teamMembers = await db.getTeamMembers(connection)
  const standupOrders = await db.getStandupOrders(connection)

  const prevStandups = standupOrders.reduce<{ [key: string]: number[] }>(
    (acc, standupOrder) => ({
      ...acc,
      [`${standupOrder.standupsId}`]: [
        ...(acc[`${standupOrder.standupsId}`] || []),
        standupOrder.teamMembersId
      ]
    }),
    {}
  )

  const prevOrders = Object.values(prevStandups).map(teamMembersIds => teamMembersIds.join(','))

  let isDuplicate

  do {
    shuffleInPlace(teamMembers)
    const teamMembersIds = teamMembers.map(teamMember => teamMember.id).join(',')
    // The number of possible permutations must be greater than `maxStandupsStored`
    isDuplicate = prevOrders.includes(teamMembersIds)
  } while (isDuplicate)

  saveNewPermutation(connection, teamMembers, Object.keys(prevStandups).map(Number))

  return teamMembers.map(teamMember => teamMember.name)
}
