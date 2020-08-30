import { Router } from "express";
import hymn from "./hymn-router";

const routes = Router()

routes.use("/hymn", hymn)

export default routes