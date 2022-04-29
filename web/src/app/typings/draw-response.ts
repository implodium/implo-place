import {Cell} from "./cell";

export interface DrawResponse {
  isAllowed: boolean,
  updatedCell?: Cell
}
