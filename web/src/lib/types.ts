export type MainOrSub =
  | { main: true; sub?: undefined }
  | { main?: undefined; sub: true }
