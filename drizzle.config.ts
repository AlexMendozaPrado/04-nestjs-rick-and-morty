import { defineConfig } from 'drizzle-kit'
import { dbConfig } from './app/dbConfig'
import { isProd } from './app/const/config'

export default defineConfig({
  schema: './app/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    ssl: isProd,
  },
})
