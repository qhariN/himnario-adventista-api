import { CromoMiddleware } from 'cromo'

export const cors: CromoMiddleware = (context, response, next) => {
  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader('Access-Control-Allow-Headers','X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  if (context.request.method === 'OPTIONS') {
    return response.json({ message: 'ok' })
  }
  next(context, response)
}
