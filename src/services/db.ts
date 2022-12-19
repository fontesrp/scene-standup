import mysql, { Connection, FieldPacket } from 'mysql2'

type AffectedRows = number

type QueryData = {
  fields: FieldPacket[]
  results: any
}

type StandupOrder = {
  id: number
  memberOrder: number
  standupsId: number
  teamMembersId: number
}

type StandupOrderDb = {
  id: number
  member_order: number
  standups_id: number
  team_members_id: number
}

export type TeamMember = {
  id: number
  name: string
}

const query = (connection: Connection, sql: string): Promise<QueryData> =>
  new Promise((resolve, reject) =>
    connection.query(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve({ fields, results })
      }
    })
  )

export const addStandups = async (connection: Connection): Promise<number> => {
  const { results } = await query(connection, 'INSERT INTO standups (created_at) VALUES (NOW())')
  return results.insertId
}

export const addStandupOrders = async (
  connection: Connection,
  values: string
): Promise<AffectedRows> => {
  // Values are escaped by the controller
  const { results } = await query(
    connection,
    `INSERT INTO standup_orders (standups_id, team_members_id, member_order) VALUES ${values}`
  )
  return results.affectedRows
}

export const createConnection = (): Connection =>
  mysql.createConnection(process.env.DATABASE_URL || '')

export const deleteStandups = async (connection: Connection, id: number): Promise<AffectedRows> => {
  const sql = mysql.format('DELETE FROM standups WHERE id = ?', [id])
  const { results } = await query(connection, sql)
  return results.affectedRows
}

export const deleteStandupOrders = async (
  connection: Connection,
  standupsId: number
): Promise<AffectedRows> => {
  const sql = mysql.format('DELETE FROM standup_orders WHERE standups_id = ?', [standupsId])
  const { results } = await query(connection, sql)
  return results.affectedRows
}

export const getOldestStandupId = async (connection: Connection): Promise<number> => {
  const { results } = await query(connection, 'SELECT id FROM standups ORDER BY created_at LIMIT 1')
  return results?.[0]?.id || 0
}

export const getStandupOrders = async (connection: Connection): Promise<[StandupOrder]> => {
  const { results } = await query(
    connection,
    `SELECT id, standups_id, team_members_id, member_order
    FROM standup_orders
    ORDER BY standups_id, member_order`
  )

  return results.map(({ id, member_order, standups_id, team_members_id }: StandupOrderDb) => ({
    id: id,
    memberOrder: member_order,
    standupsId: standups_id,
    teamMembersId: team_members_id
  }))
}

export const getTeamMembers = async (connection: Connection): Promise<[TeamMember]> => {
  const { results } = await query(connection, 'SELECT id, name FROM team_members')
  return results
}

export const isUserInvited = async (connection: Connection, email: string): Promise<boolean> => {
  const sql = mysql.format('SELECT id FROM invited_users WHERE email = ?', [email])
  const { results } = await query(connection, sql)
  return !!results?.length
}
