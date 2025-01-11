export const CONFIG={
  FAILURE_THRESHOLD:parseInt(process.env.FAILURE_THRESHOLD ||'5')
  TIME_WINDOW_MINUTES:parseInt(process.env.TIME_WINDOW_MINUTES ||'10')
  JWT_SECRET:process.env.JWT_SECRET || 'post-guard-secret'
}
