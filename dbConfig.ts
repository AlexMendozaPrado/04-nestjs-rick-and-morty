import dotenv from 'dotenv'

dotenv.config()

interface DBConfig {
  port: number
  host: string
  user: string
  password: string
  database: string
}

export const dbConfig: DBConfig = {
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  host: process.env.DB_SERVER as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DB_NAME as string,
}
