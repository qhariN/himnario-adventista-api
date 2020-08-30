import { Router } from "express";
import HymnController from "../controllers/hymn-controller";
// import AttendanceController from "../controllers/AttendanceController";

const router = Router()

router.get("/read/:id", HymnController.getHymnHistory)

export default router