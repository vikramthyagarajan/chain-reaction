import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser'

export interface Game {
    players: number;
    board: number[];
    lobbyId?: string;
    viewers?: number;
}