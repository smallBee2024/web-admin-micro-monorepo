import { ConfigType, registerAs } from '@nestjs/config'


export const dbRegToken = 'database'

export const DatabaseConfig = registerAs(
  dbRegToken,
  (): any => ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }),
)