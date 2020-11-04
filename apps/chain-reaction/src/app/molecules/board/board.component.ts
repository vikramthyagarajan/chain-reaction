import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  dimensions = [16, 16];
  currentPlayer = 0;
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
      };
    })
  );

  constructor() {}

  addCount(rowNo: number, colNo: number): void {
    const currentItem = this.board[colNo][rowNo];
    if (currentItem.count < currentItem.maxCount) {
      currentItem.count++;
    } else {
      currentItem.count = 0;
      if (this.board[colNo + 1] && this.board[colNo + 1][rowNo]) {
        this.addCount(rowNo, colNo + 1);
      }
      if (this.board[colNo - 1] && this.board[colNo - 1][rowNo]) {
        this.addCount(rowNo, colNo - 1);
      }
      if (this.board[colNo][rowNo - 1]) {
        this.addCount(rowNo - 1, colNo);
      }
      if (this.board[colNo][rowNo + 1]) {
        this.addCount(rowNo + 1, colNo);
      }
    }
  }

  playMove(playerNo: number, block: IBlock): void {
    this.addCount(block.rowNo, block.colNo);

    return;
  }

  ngOnInit(): void {}
}

export interface IBlock {
  color: string;
  count: number;
  maxCount: number;
  rowNo: number;
  colNo: number;
}
