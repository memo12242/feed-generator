import { Pool } from 'pg'
import { Kysely, Migrator, PostgresDialect } from 'kysely'
import { DatabaseSchema } from './schema'
import { migrationProvider } from './migrations'

export const createDb = (connectionUrl: string): Database => {
  const pool = new Pool({
    connectionString: connectionUrl,
  })

  return new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({ pool }),
  })
}

export const migrateToLatest = async (db: Database) => {
  const migrator = new Migrator({ db, provider: migrationProvider })
  const { error } = await migrator.migrateToLatest()
  if (error) throw error
}

export type Database = Kysely<DatabaseSchema>
