import { Component, OnInit, Input } from '@angular/core';
import { IBlock, IPlayer } from '../../molecules/board/board.types';
import { Block } from './block.types';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  @Input() block: IBlock;

  constructor() {}

  ngOnInit(): void {}
}
