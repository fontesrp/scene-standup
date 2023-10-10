import * as db from 'src/services/db'
import { shuffleInPlace } from 'src/services/util'

const maxStandupsStored = 15

const saveNewPermutation = async (teamMembers: db.TeamMember[], prevStandups: number[]) => {
  // Don't keep the request hanging
  await Promise.resolve()

  if (prevStandups.length >= maxStandupsStored) {
    const oldestStandupId = db.getOldestStandupId()
    db.deleteStandupOrders(oldestStandupId)
    db.deleteStandups(oldestStandupId)
  }

  const newStandupId = db.addStandups()

  const values = teamMembers.map((teamMember, idx) => ({
    member_order: idx,
    standups_id: newStandupId,
    team_members_id: teamMember.id
  }))

  db.addStandupOrders(values)
}

export const getNamesPermutation = async (): Promise<string[]> => {
  const teamMembers = db.getTeamMembers()
  const standupOrders = db.getStandupOrders()

  const prevStandups = standupOrders.reduce<{ [key: string]: number[] }>((acc, standupOrder) => {
    const standupKey = `${standupOrder.standups_id}`

    if (acc[standupKey]) {
      acc[standupKey].push(standupOrder.team_members_id)
    } else {
      acc[standupKey] = [standupOrder.team_members_id]
    }

    return acc
  }, {})

  const prevOrders = Object.values(prevStandups).map(teamMembersIds => teamMembersIds.join(','))

  let isDuplicate

  do {
    shuffleInPlace(teamMembers)
    const teamMembersIds = teamMembers.map(teamMember => teamMember.id).join(',')
    // The number of possible permutations must be greater than `maxStandupsStored`
    isDuplicate = prevOrders.includes(teamMembersIds)
  } while (isDuplicate)

  saveNewPermutation(teamMembers, Object.keys(prevStandups).map(Number))

  return teamMembers.map(teamMember => teamMember.name)
}
