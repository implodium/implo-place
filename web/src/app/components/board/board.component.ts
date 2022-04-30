import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from "../../typings/cell";
import {CooldownSocketService} from "../../services/cooldown-socket.service";
import {DrawRequest} from "../../typings/draw-request";
import {DrawResponse} from "../../typings/draw-response";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input("width")
  width!: number

  @Input("height")
  height!: number

  @Input("drawing-color")
  color!: string

  @Input("can-draw")
  canDraw: boolean = true

  @Output("draw")
  draw: EventEmitter<DrawRequest> = new EventEmitter<DrawRequest>()

  grid: Cell[][] = []

  selectedCell?: Cell

  @Input('definedCells')
  definedCells: Cell[] = []

  constructor(private readonly cooldownSocket: CooldownSocketService) { }

  ngOnInit(): void {
    this.constructGrid();
    this.fillInDefinedCells()
  }

  private constructGrid() {
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.height; j++) {
        this.grid[i][j] = {
          id: {x: i, y: j, board: { id: 0}},
          color: 'white',
        }
      }
    }
  }

  requestDraw(cell: Cell) {
    this.draw.emit({
      color: this.color,
      cell
    })
  }

  visualizeDraw(response: DrawResponse) {
    const updatedCell = response.updatedCell

    if (updatedCell) {
      this.grid[updatedCell.id.x][updatedCell.id.y] = updatedCell
    }
  }

  setSelected(cell: Cell) {
    if (cell && cell.user) {
      this.selectedCell = cell
    }
  }

  private fillInDefinedCells() {
    this.definedCells.forEach(cell => {
      this.grid[cell.id.x][cell.id.y] = cell
    })
  }
}
