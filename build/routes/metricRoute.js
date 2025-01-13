"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metricController_1 = require("../controllers/metricController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/metrics", (req, res, next) => (0, auth_1.validateToken)(req, res, next), metricController_1.metricsController.getMetrics);
exports.default = router;
