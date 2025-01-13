"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = __importDefault(require("express"));
const submitController_1 = require("../controllers/submitController");
const headerValidator_1 = require("../middlewares/headerValidator");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/submit", (req, res, next) => (0, headerValidator_1.validateHeaders)(req, res, next), (req, res, next) => (0, auth_1.validateToken)(req, res, next), submitController_1.submitController.handleSubmit);
exports.default = router;
