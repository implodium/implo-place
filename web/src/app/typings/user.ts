export interface User {
  id: string,
  displayName: string,
  discriminator: string
  settings: {
    fastmode: boolean
  }
}
