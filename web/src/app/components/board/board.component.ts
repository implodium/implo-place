import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from "../../typings/cell";
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

  @Input("fastmode")
  fastmode: boolean = false

  @Input('definedCells')
  definedCells: Cell[] = []

  @Input('cell-select')
  cellIsSelected: boolean = false

  @Output("cell-select")
  cellSelectEvent: EventEmitter<Cell> = new EventEmitter<Cell>()

  @Output("draw-color")
  drawColorEvent: EventEmitter<Cell> = new EventEmitter<Cell>()

  grid: Cell[][] = []

  hoveringCell?: Cell

  selectedCell?: Cell;

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

  cellSelect(cell: Cell) {
    this.selectedCell = cell

    if (this.fastmode) {
      this.drawColor(cell)
    } else {
      this.cellSelectEvent.emit(cell)
    }
  }

  drawColor(cell: Cell) {
    this.drawColorEvent.emit(cell)
  }

  visualizeDraw(response: DrawResponse) {
    const updatedCell = response.updatedCell

    if (updatedCell) {
      this.grid[updatedCell.id.x][updatedCell.id.y] = updatedCell
    }
  }

  setHovering(cell: Cell) {
    if (cell && cell.user) {
      this.hoveringCell = cell
    }
  }

  private fillInDefinedCells() {
    this.definedCells.forEach(cell => {
      this.grid[cell.id.x][cell.id.y] = cell
    })
  }

  isSelected(cell: Cell) {
    return !this.fastmode
      && this.cellIsSelected
      && this.canDraw
      && this.selectedCell
      && this.selectedCell.id.x === cell.id.x
      && this.selectedCell.id.y === cell.id.y
  }

  get displayCell() {
    if (this.fastmode) {
      return this.hoveringCell
    } else {
      return this.selectedCell
    }
  }
}
