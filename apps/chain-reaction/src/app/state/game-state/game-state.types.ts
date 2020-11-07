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

export interface Game {
  players: number;
  board: number[];
  lobbyId?: string;
  viewers?: number;
}

export interface IGameDefinition {
  dimensions: number[];
  noOfPlayers: number;
  colors: string[];
}

export interface IGameState {
  players: IPlayer[];
  currentPlayer: IPlayer | null;
  board: IBlock[][];
}
