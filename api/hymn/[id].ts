import Database from 'bun:sqlite'
import type { CromoHandler, CromoMiddleware } from 'cromo'
import { cors } from '../../src/middleware/cors'

export const GET: CromoHandler = ({ params }) => {
  const { id } = params

  const db = new Database('./src/database/himnario.db')
  const hymn = db
    .query('SELECT id, number, title, mp3Url, mp3UrlInstr, mp3Filename FROM hymn WHERE id = ?1')
    .get(id)

  if (!hymn) return Response.json({ error: 'Hymn not found' }, 404)

  let history = db
    .query(`
      SELECT position, timestamp, verse.number, verse.content
      FROM history
        INNER JOIN verse ON verse.id = history.verseId
        INNER JOIN hymn ON hymn.id = verse.hymnId
      WHERE hymn.id = ?1
      ORDER BY history.position ASC
    `)
    .all(id)
    .map((verseHistory: any) => ({
      position: verseHistory.position,
      timestamp: verseHistory.timestamp,
      verse: {
        number: verseHistory.number,
        content: verseHistory.content
      }
    }))

  return Response.json({ hymn, history })
}

export const use: CromoMiddleware[] = [
  cors
]
