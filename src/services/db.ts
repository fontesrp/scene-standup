type InvitedUser = {
  id: number
  email: string
}

type StandupOrder = {
  id: number
  member_order: number
  standups_id: number
  team_members_id: number
}

type StandupOrderInsert = Omit<StandupOrder, 'id'>

type Standup = {
  id: number
  created_at: number
}

export type TeamMember = {
  id: number
  name: string
}

const inMemoryDb = new Map<String, any>()

inMemoryDb.set('invited_users', JSON.parse(process.env.INVITED_USERS || '[]'))
inMemoryDb.set('team_members', JSON.parse(process.env.TEAM_MEMBERS || '[]'))

export const addStandups = () => {
  const standups: Standup[] = inMemoryDb.get('standups') || []
  const standup = { id: standups.length, created_at: Date.now() }
  standups.push(standup)
  inMemoryDb.set('standups', standups)
  return standup.id
}

export const addStandupOrders = (values: StandupOrderInsert[]) => {
  const standupOrders: StandupOrder[] = inMemoryDb.get('standup_orders') || []
  standupOrders.push(...values.map((value, idx) => ({ ...value, id: standupOrders.length + idx })))
  inMemoryDb.set('standup_orders', standupOrders)
}

export const deleteStandups = (id: number) => {
  const standups: Standup[] = inMemoryDb.get('standups') || []
  inMemoryDb.set(
    'standups',
    standups.filter(standup => standup.id !== id)
  )
}

export const deleteStandupOrders = async (standupsId: number) => {
  const standupOrders: StandupOrder[] = inMemoryDb.get('standup_orders') || []
  inMemoryDb.set(
    'standup_orders',
    standupOrders.filter(standupOrder => standupOrder.standups_id !== standupsId)
  )
}

export const getOldestStandupId = (): number => {
  const standups: Standup[] = inMemoryDb.get('standups') || []
  const standupsCopy = [...standups]
  return (
    standupsCopy.sort((standup1, standup2) => standup1.created_at - standup2.created_at)[0]?.id || 0
  )
}

export const getStandupOrders = (): StandupOrder[] => {
  const standupOrders: StandupOrder[] = inMemoryDb.get('standup_orders') || []
  const standupOrdersCopy = [...standupOrders]
  return standupOrdersCopy.sort(
    (standupOrder1, standupOrder2) =>
      standupOrder1.standups_id - standupOrder2.standups_id ||
      standupOrder1.member_order - standupOrder2.member_order
  )
}

export const getTeamMembers = (): TeamMember[] => {
  const teamMembers: TeamMember[] = inMemoryDb.get('team_members') || []
  return teamMembers
}

export const isUserInvited = (email: string): boolean => {
  const invitedUsers: InvitedUser[] = inMemoryDb.get('invited_users') || []
  return invitedUsers.some(invitedUser => invitedUser.email === email)
}
