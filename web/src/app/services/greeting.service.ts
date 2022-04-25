import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  afternoonGreetings: string[] = [
    "Good Afternoon"
  ]

  morningGreetings: string[] = [
    "Good Morning"
  ]

  eveningGreetings: string[] = [
    "Good Evening"
  ]

  constructor() { }

  get afternoonGreeting() {
    return this.produceRandomOf(this.afternoonGreetings)
  }

  get morningGreeting() {
    return this.produceRandomOf(this.morningGreetings)
  }

  get eveningGreeting() {
    return this.produceRandomOf(this.eveningGreetings)
  }

  produceRandomOf(array: any[]) {
    const length = array.length
    const randomIndex = Math.trunc(Math.random() * length)
    return array[randomIndex]
  }

  get greeting() {
    const time = new Date()
    const hour = time.getHours()

    if (hour < 12) {
      return this.morningGreeting
    } else if (hour > 12 && hour < 18) {
      return this.afternoonGreeting
    } else if (hour > 18) {
      return this.eveningGreeting
    }
  }
}
