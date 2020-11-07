import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../state/game-state/game-state.service';
import { IBlock, IGameState } from './../../state/game-state/game-state.types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  gameState: IGameState;
  gameStateService: GameStateService;
  board: IBlock[][];
  constructor(gameStateService: GameStateService) {
    this.gameStateService = gameStateService;
    this.gameState = gameStateService.getState();
    this.board = this.gameState.board;
  }

  clickBlock(block: IBlock): void {
    this.gameStateService.playMove(this.gameState.currentPlayer, block);
  }

  ngOnInit(): void {}
}
