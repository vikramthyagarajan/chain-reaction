import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardComponent } from './molecules/board/board.component';
import { BlockComponent } from './atoms/block/block.component';
import { PlayerCardComponent } from './atoms/player-card/player-card.component';
import { LeftPanelComponent } from './molecules/left-panel/left-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    BoardComponent,
    BlockComponent,
    PlayerCardComponent,
    LeftPanelComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
