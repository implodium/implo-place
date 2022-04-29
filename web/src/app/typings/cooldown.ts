export default class Cooldown {
  public minutes: number
  public seconds: number
  public active: boolean
  public error: boolean

  constructor(
    minutes: number,
    seconds: number,
    active: boolean,
    error: boolean
  ) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.active = active;
    this.error = error;
  }
}
