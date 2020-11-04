import { Component, OnInit } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = {
    players: 2,
    board: [16, 16]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
