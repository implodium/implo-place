import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DrawRequest} from "../../typings/draw-request";

@Component({
  selector: 'app-color-pallette',
  templateUrl: './color-pallette.component.html',
  styleUrls: ['./color-pallette.component.scss']
})
export class ColorPalletteComponent implements OnInit {

  colors: string[] = [
    "white",
    "black",
    "green",
    "red",
    "blue"
  ]

  selected: string = this.colors[0]

  @Input('enabled')
  pixelIsSelected: boolean = false

  @Input('fastmode')
  fastmode: boolean = false

  @Output('draw')
  drawEvent: EventEmitter<string> = new EventEmitter<string>()

  @Output('change-color')
  changeColorEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  changeSelected(color: string) {
    this.selected = color
    this.changeColorEvent.emit(this.selected)
  }

  draw() {
    this.drawEvent.emit(this.selected)
  }

  get enabled() {
    console.log(this.fastmode)
    return this.pixelIsSelected || this.fastmode
  }
}
