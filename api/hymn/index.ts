import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = () => {
  const db = new Database('./src/database/himnario.db')
  const query = db.query('SELECT id, number, title FROM hymn')

  return Response.json(query.all())
}