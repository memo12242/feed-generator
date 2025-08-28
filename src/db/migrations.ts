import { Kysely, Migration, MigrationProvider } from 'kysely'

const migrations: Record<string, Migration> = {}

export const migrationProvider: MigrationProvider = {
  async getMigrations() {
    return migrations
  },
}

migrations['001'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('post')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('cid', 'varchar', (col) => col.notNull())
      .addColumn('text', 'text', (col) => col.notNull()) 
      .addColumn('indexedAt', 'varchar', (col) => col.notNull())
      .execute()
    await db.schema
      .createTable('sub_state')
      .addColumn('service', 'varchar', (col) => col.primaryKey())
      .addColumn('cursor', 'integer', (col) => col.notNull())
      .execute()
  },
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable('post').execute()
    await db.schema.dropTable('sub_state').execute()
  },
}

migrations['002'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .createTable('filtered_post_swift_ja')
      .addColumn('uri', 'varchar', (col) => col.primaryKey())
      .addColumn('cid', 'varchar', (col) => col.notNull())
      .addColumn('text', 'text', (col) => col.notNull())
      .addColumn('indexedAt', 'varchar', (col) => col.notNull())
      .execute()
  },
  
  async down(db: Kysely<unknown>) {
    await db.schema.dropTable('filtered_post_swift_ja').execute()
  },
}

migrations['003'] = {
  async up(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post')
      .addColumn('id', 'serial', (col) => col.unique())
      .execute()

    await db.schema
      .alterTable('filtered_post_swift_ja')
      .addColumn('id', 'serial', (col) => col.unique())
      .execute()
  },
  
  async down(db: Kysely<unknown>) {
    await db.schema
      .alterTable('post')
      .dropColumn('id')
      .execute()
    
    await db.schema
      .alterTable('filtered_post_swift_ja')
      .dropColumn('id')
      .execute()
  },
}