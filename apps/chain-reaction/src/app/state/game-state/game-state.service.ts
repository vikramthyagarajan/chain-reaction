import { Injectable } from '@angular/core';
import { IBlock, IPlayer } from '../../molecules/board/board.types';
import { IGameDefinition, IGameState } from './game-state.types';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  definition: IGameDefinition;
  state: IGameState;

  constructor() {
    this.initializeState();
  }

  private initializeState(): void {
    this.definition = {
      noOfPlayers: 2,
      dimensions: [8, 8],
      colors: ['yellow', 'black', 'orange', 'red'],
    };
    const cols = this.definition.dimensions[0];
    const rows = this.definition.dimensions[1];
    const players = new Array(this.definition.noOfPlayers)
      .fill({})
      .map((_, i) => {
        return {
          playerNo: i + 1,
          name: 'Player ' + (i + 1),
          color: this.definition.colors[i],
        };
      });
    this.state = {
      board: new Array(cols).fill({}).map((a, colNo) => {
        return new Array(rows).fill({}).map((b, rowNo) => {
          let maxCount = 3;
          if (rowNo === 0 || rowNo === rows - 1) {
            maxCount--;
          }
          if (colNo === 0 || colNo === cols - 1) {
            maxCount--;
          }
          return {
            color: 'yellow',
            count: 0,
            maxCount,
            rowNo,
            colNo,
            player: null,
          };
        });
      }),
      players,
      currentPlayer: players[0],
    };
  }

  public getState(): IGameState {
    return this.state;
  }

  public playMove(currentPlayer: IPlayer, block: IBlock): void {
    // Cannot play a block belonging to another player
    console.log('block', block.player, currentPlayer);
    if (block.player && block.player.playerNo !== currentPlayer.playerNo) {
      return;
    }
    this.addCount(currentPlayer, block.rowNo, block.colNo);
    console.log('old player', this.state.currentPlayer);
    this.state.currentPlayer = this.nextPlayer(currentPlayer);
    console.log('new player', this.state.currentPlayer);

    return;
  }

  private addCount(player: IPlayer, rowNo: number, colNo: number): void {
    const currentItem = this.state.board[colNo][rowNo];
    currentItem.player = player;
    console.log('player is', JSON.stringify(currentItem), player);
    if (currentItem.count < currentItem.maxCount) {
      currentItem.count++;
    } else {
      currentItem.player = null;
      currentItem.count = 0;
      if (this.state.board[colNo + 1] && this.state.board[colNo + 1][rowNo]) {
        this.addCount(player, rowNo, colNo + 1);
      }
      if (this.state.board[colNo - 1] && this.state.board[colNo - 1][rowNo]) {
        this.addCount(player, rowNo, colNo - 1);
      }
      if (this.state.board[colNo][rowNo - 1]) {
        this.addCount(player, rowNo - 1, colNo);
      }
      if (this.state.board[colNo][rowNo + 1]) {
        this.addCount(player, rowNo + 1, colNo);
      }
    }
  }

  private nextPlayer(currentPlayer: IPlayer): IPlayer {
    const index = this.state.players.indexOf(currentPlayer);
    console.log('ind', index, this.state.players);
    if (this.state.players[index + 1]) {
      return this.state.players[index + 1];
    } else {
      return this.state.players[0];
    }
  }

  private checkWinCondition(): boolean {
    const playerCounts: any = {};
    this.state.players.forEach((player) => {
      playerCounts[player.playerNo] = {
        count: 0,
      };
    });
    for (let colNo = 0; colNo < this.state.board.length; colNo++) {
      for (let rowNo = 0; rowNo < this.state.board[colNo].length; rowNo++) {
        const block = this.state.board[colNo][rowNo];
        if (block.player) {
          playerCounts[block.player.playerNo].count++;
        }
      }
    }
    // if(playerCounts[this.currentPlayer.playerNo] > 0 && player)
    return false;
  }
}
