import { Router } from 'express'
import HymnController from '../controllers/hymn-controller'

const router = Router()

router.get('/:id', HymnController.getHymnHistoryByNumber)

export default router
