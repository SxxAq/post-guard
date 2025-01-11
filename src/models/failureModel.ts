import mongoose from "mongoose";

const failureSchema = new mongoose.Schema({
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

export const FailureModal = mongoose.model("FailedSubmission", failureSchema);
