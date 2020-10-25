import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  dimensions = [16, 16]
  currentPlayer = 0
  board = new Array(this.dimensions[0]).fill(0).map(a => new Array(this.dimensions[1]).fill({color: 'yellow', count: 0}))

  constructor() { }

  ngOnInit(): void {
  }

}
