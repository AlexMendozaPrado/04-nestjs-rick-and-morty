// src/db/index.ts
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import { sql } from '@vercel/postgres'
import { isProd } from '../const/config'

import { Pool } from 'pg'
import { dbConfig } from '../dbConfig'

export const client = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionTimeoutMillis: 30000,
})

export const db = isProd ? drizzleVercel(sql) : drizzle(client)
