import {User} from "./user";

export interface Cell {

  id: {x: number, y: number, board: {id: number}}
  color: string
  user?: User

}
