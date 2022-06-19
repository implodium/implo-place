import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DrawRequest} from "../../typings/draw-request";

@Component({
  selector: 'app-color-pallette',
  templateUrl: './color-pallette.component.html',
  styleUrls: ['./color-pallette.component.scss']
})
export class ColorPalletteComponent implements OnInit {

  @Output('draw')
  drawEvent: EventEmitter<string> = new EventEmitter<string>()

  colors: string[] = [
    "white",
    "black",
    "green",
    "red",
    "blue"
  ]

  selected: string = this.colors[0]

  @Input('enabled')
  enabled: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  changeSelected(color: string) {
    this.selected = color
  }

  draw() {
    this.drawEvent.emit(this.selected)
  }
}
