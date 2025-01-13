//@ts-nocheck

import express from "express";
import { login } from "../middlewares/auth";

const router = express.Router();

router.post("/login", (req, res) => login(req, res));

export default router;
