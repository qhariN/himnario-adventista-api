import { Router } from "express";
import HymnController from "../controllers/hymn-controller";

const router = Router()

router.get("/read/:id", HymnController.getHymnHistoryByNumber)

export default router