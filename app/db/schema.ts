// src/db/schema.ts
// adjust schema based on your requirements
import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core'

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey().notNull(),
  characterId: integer('characterId').notNull(),
  created: timestamp('created').defaultNow().notNull(),
})

export type FavoritesSelect = typeof favorites.$inferSelect
export type FavoritesInsert = typeof favorites.$inferInsert
