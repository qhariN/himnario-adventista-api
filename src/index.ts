import Database from 'bun:sqlite'
import { Router } from './router'

const db = new Database('./src/database/himnario.db')

const server = Bun.serve({
  fetch (request) {
    const router = new Router(request)

    router.get('/hymn', (params, response) => {
      const query = db.query('SELECT id, number, title FROM hymn')
      return response.json(query.all())
    })

    router.get('/hymn/:id', (params, response) => {
      const hymnId = params.id
      const hymn = db
        .query('SELECT id, number, title, mp3Url, mp3UrlInstr, mp3Filename FROM hymn WHERE id = ?1')
        .get(hymnId)

      if (!hymn) return new Response(null, { status: 404 })

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
      history = history.map((item: any) => ({
        position: item.position,
        timestamp: item.timestamp,
        verse: {
          number: item.number,
          content: item.content
        }
      }))
      return response.json({ hymn, history })
    })

    return router.response
  }
})

console.log(`Listening on http://localhost:${server.port}...`)
