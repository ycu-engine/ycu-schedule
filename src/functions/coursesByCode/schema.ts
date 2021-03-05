export default {
  type: "object",
  properties: {
    token: { type: "string" },
    code: { type: "string" },
  },
  required: ["token", "code"],
} as const
