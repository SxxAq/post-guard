//@ts-nocheck
import express from "express";
import { submitController } from "../controllers/submitController";
import { validateHeaders } from "../middlewares/headerValidator";
import { validateToken } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/submit",
  (req, res, next) => validateHeaders(req, res, next),
  (req, res, next) => validateToken(req, res, next),
  submitController.handleSubmit,
);

export default router;
