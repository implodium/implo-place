export interface UserResponseDto {
  discriminator: string,
  displayName: string,
  id: string
  settings: {
    fastmode: boolean
  }
}
