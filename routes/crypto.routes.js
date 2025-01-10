import { Router } from "express";
import { findDeviation, listStats } from "../controller/crypto.controller";

const router = Router();

router.get("/stats", listStats);
router.get("/deviation", findDeviation);
