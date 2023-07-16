import Database from 'bun:sqlite'
import type { CromoHandler, CromoMiddleware } from 'cromo'
import { cors } from '../../src/middleware/cors'

export const GET: CromoHandler = (context, response) => {
  const db = new Database('./src/database/himnario.db')
  const query = db.query('SELECT id, number, title FROM hymn')

  response.json(query.all())
}

export const use: CromoMiddleware[] = [
  cors
]
