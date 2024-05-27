import { defineConfig } from 'drizzle-kit'
import { dbConfig } from './dbConfig'

export default defineConfig({
  schema: './app/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  },
})
