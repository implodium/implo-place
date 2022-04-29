import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
