import Database from 'bun:sqlite'
import type { CromoHandler, CromoMiddleware } from 'cromo'
import { cors } from '../../src/middleware/cors'

export const GET: CromoHandler = ({ matchedRoute }, response) => {
  const hymnId = matchedRoute.params.id

  const db = new Database('./src/database/himnario.db')
  const hymn = db
    .query('SELECT id, number, title, mp3Url, mp3UrlInstr, mp3Filename FROM hymn WHERE id = ?1')
    .get(hymnId)

  if (!hymn) return response.status(404).json({ error: 'Hymn not found' })

  let history = db
    .query(`
      SELECT position, timestamp, verse.number, verse.content
      FROM history
        INNER JOIN verse ON verse.id = history.verseId
        INNER JOIN hymn ON hymn.id = verse.hymnId
      WHERE hymn.id = ?1
      ORDER BY history.position ASC
    `)
    .all(hymnId)
    .map((verseHistory: any) => ({
      position: verseHistory.position,
      timestamp: verseHistory.timestamp,
      verse: {
        number: verseHistory.number,
        content: verseHistory.content
      }
    }))

  response.json({ hymn, history })
}

export const use: CromoMiddleware[] = [
  cors
]
