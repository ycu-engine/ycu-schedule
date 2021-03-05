export default {
  type: "object",
  properties: {
    token: { type: "string" },
    week: { type: "number" },
    period: { type: "number" },
  },
  required: ["token", "week", "period"],
} as const
