export interface ConnectedUser {
  id: string,
  username: string,
  discriminator: string
  isDisconnect?: boolean
}
