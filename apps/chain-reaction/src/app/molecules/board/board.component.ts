import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { IpcNetConnectOpts } from 'net';
import { IBlock, IPlayer } from './board.types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  dimensions = [8, 8];
  noOfPlayers = 2;
  colors = ['yellow', 'black', 'orange', 'red'];
  players: IPlayer[] | null = null;
  currentPlayer: IPlayer;
  board: IBlock[][] = new Array(this.dimensions[0]).fill(0).map((a, colNo) =>
    new Array(this.dimensions[1]).fill(0).map((b, rowNo) => {
      let maxCount = 3;
      if (rowNo === 0 || rowNo === this.dimensions[1] - 1) {
        maxCount--;
      }
      if (colNo === 0 || colNo === this.dimensions[0] - 1) {
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
    })
  );

  constructor() {}

  addCount(player: IPlayer, rowNo: number, colNo: number): void {
    let currentItem = this.board[colNo][rowNo];
    currentItem.player = player;
    console.log('player is', JSON.stringify(currentItem), player);
    if (currentItem.count < currentItem.maxCount) {
      currentItem.count++;
    } else {
      currentItem.player = null;
      currentItem.count = 0;
      if (this.board[colNo + 1] && this.board[colNo + 1][rowNo]) {
        this.addCount(player, rowNo, colNo + 1);
      }
      if (this.board[colNo - 1] && this.board[colNo - 1][rowNo]) {
        this.addCount(player, rowNo, colNo - 1);
      }
      if (this.board[colNo][rowNo - 1]) {
        this.addCount(player, rowNo - 1, colNo);
      }
      if (this.board[colNo][rowNo + 1]) {
        this.addCount(player, rowNo + 1, colNo);
      }
    }
  }

  nextPlayer(currentPlayer: IPlayer): IPlayer {
    const index = this.players.indexOf(currentPlayer);
    console.log('ind', index, this.players);
    if (this.players[index + 1]) {
      return this.players[index + 1];
    } else {
      return this.players[0];
    }
  }

  playMove(currentPlayer: IPlayer, block: IBlock): void {
    // Cannot play a block belonging to another player
    console.log('block', block.player, currentPlayer);
    if (block.player && block.player.playerNo !== currentPlayer.playerNo) {
      return;
    }
    this.addCount(currentPlayer, block.rowNo, block.colNo);
    console.log('old player', this.currentPlayer);
    this.currentPlayer = this.nextPlayer(currentPlayer);
    console.log('new player', this.currentPlayer);

    return;
  }

  ngOnInit(): void {
    this.players = [];
    for (let i = 0; i < this.noOfPlayers; i++) {
      this.players.push({
        playerNo: i + 1,
        name: 'Player ' + (i + 1),
        color: this.colors[i],
      });
    }
    this.currentPlayer = this.players[0];
  }
}
