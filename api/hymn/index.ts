import Database from 'bun:sqlite'
import type { CromoHandler, CromoMiddleware } from 'cromo'
import { cors } from '../../src/middleware/cors'

export const GET: CromoHandler = ({ responseInit }) => {
  const db = new Database('./src/database/himnario.db')
  const query = db.query('SELECT id, number, title FROM hymn')

  return Response.json(query.all(), responseInit)
}

export const use: CromoMiddleware[] = [
  cors
]
