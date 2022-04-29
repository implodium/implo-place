import {Component, Input, OnInit} from '@angular/core';
import {Cell} from "../../typings/cell";

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

  grid: Cell[][] = []

  constructor() { }

  ngOnInit(): void {
    this.constructGrid();
  }

  private constructGrid() {
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.height; j++) {
        this.grid[i][j] = {
          x: i,
          y: j,
          color: '#FFFFFF'
        }
      }
    }
  }

  draw(cell: Cell) {
    cell.color = this.color
  }
}
