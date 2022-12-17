import mysql, { Connection, FieldPacket } from 'mysql2'

type AffectedRows = number

type QueryData = {
  fields: FieldPacket[]
  results: any
}

export type StandupOrder = {
  createdAt: Date
  id: number
  teamMembersIds: string
}

type StandupOrderDb = {
  created_at: Date
  id: number
  team_members_ids: string
}

export type TeamMember = {
  id: number
  name: string
}

export const createConnection = (): Connection =>
  mysql.createConnection(process.env.DATABASE_URL || '')

export const query = (connection: Connection, sql: string): Promise<QueryData> =>
  new Promise((resolve, reject) =>
    connection.query(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, results })
      }
    })
  )

export const addStandupOrder = async (
  connection: Connection,
  teamMembersIds: StandupOrder['teamMembersIds']
): Promise<AffectedRows> => {
  const sql = mysql.format('INSERT INTO standup_order (team_members_ids) VALUES (?)', [
    teamMembersIds
  ])
  const { results } = await query(connection, sql)
  return results.affectedRows
}

export const deleteStandupOrder = async (
  connection: Connection,
  id: number
): Promise<AffectedRows> => {
  const sql = mysql.format('DELETE FROM standup_order WHERE id = ?', [id])
  const { results } = await query(connection, sql)
  return results.affectedRows
}

export const getStandupOrder = async (connection: Connection): Promise<[StandupOrder]> => {
  const { results } = await query(
    connection,
    'SELECT created_at, id, team_members_ids FROM standup_order'
  )

  return results.map(({ created_at, id, team_members_ids }: StandupOrderDb) => ({
    createdAt: created_at,
    id,
    teamMembersIds: team_members_ids
  }))
}

export const getTeamMembers = async (connection: Connection): Promise<[TeamMember]> => {
  const { results } = await query(connection, 'SELECT id, name FROM team_members')
  return results
}
