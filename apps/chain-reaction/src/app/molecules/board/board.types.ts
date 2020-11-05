export interface IBlock {
  color: string;
  count: number;
  maxCount: number;
  rowNo: number;
  colNo: number;
  player: IPlayer | null;
}

export interface IPlayer {
  playerNo: number;
  color: string;
  name: string;
}
