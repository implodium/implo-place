import {BehaviorSubject, map, Observable} from "rxjs";
import produce from "immer";

export default class Store<T> {

  private readonly subject: BehaviorSubject<State<T>>

  constructor(initialValue: T) {
    this.subject = new BehaviorSubject<State<T>>({value: initialValue})
  }

  get(): Observable<T> {
    return this.subject
      .pipe(map(state => state.value))
  }

  set(value: T) {
    this.subject.next(produce(this.subject.getValue(), (draft: State<T>) => {
      draft.value = value
    }))
  }

  get current() {
    return this.subject.getValue().value
  }

}

interface State<T> {
  value: T
}
