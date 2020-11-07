import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../state/game-state/game-state.service';
import { IGameState, IPlayer } from '../../state/game-state/game-state.types';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
})
export class LeftPanelComponent implements OnInit {
  gameState: IGameState;

  constructor(gameStateService: GameStateService) {
    this.gameState = gameStateService.getState();
  }

  ngOnInit(): void {}
}
