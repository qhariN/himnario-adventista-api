import Database from 'bun:sqlite'
import { CromoHandler } from 'cromo'

export const GET: CromoHandler = ({ matchedRoute }) => {
  const hymnId = matchedRoute.params.id

  const db = new Database('./src/database/himnario.db')
  const hymn = db
    .query('SELECT id, number, title, mp3Url, mp3UrlInstr, mp3Filename FROM hymn WHERE id = ?1')
    .get(hymnId)

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
    .all(hymnId)
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