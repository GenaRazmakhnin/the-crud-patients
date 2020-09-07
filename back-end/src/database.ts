import { Application } from 'express'
import { Client } from 'pg' 

const base = new Client({
  host: 'localhost',
  port: 5432,
  user: 'backend_user',
  password: '1234',
  database: 'patients2'
})

export function query(select: any) {
  return base.query(select)
    .then((results: any) => ({ data: results }))
    .catch((error: any) => ({ error: error }))
}

function databaseConnect(app: Application) {
  base.connect((err: { stack: any }) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('Database connected!')
    }
  })
}

export default databaseConnect
