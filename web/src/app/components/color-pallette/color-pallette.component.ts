import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-color-pallette',
  templateUrl: './color-pallette.component.html',
  styleUrls: ['./color-pallette.component.scss']
})
export class ColorPalletteComponent implements OnInit {

  @Output('color-change')
  colorChange: EventEmitter<string> = new EventEmitter<string>()

  colors: string[] = [
    "white",
    "black",
    "green",
    "red",
    "blue"
  ]

  selected: string = this.colors[0]

  @Input('disabled')
  disabled: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  changeSelected(color: string) {
    this.selected = color
    this.colorChange.emit(color)
  }
}
