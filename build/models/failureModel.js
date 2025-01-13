"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const failureSchema = new mongoose_1.default.Schema({
    ip: {
        type: String,
        required: true,
        index: true,
    },
    reason: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        index: true,
    },
});
exports.FailureModal = mongoose_1.default.model("FailedSubmission", failureSchema);
