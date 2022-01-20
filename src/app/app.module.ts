import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { TicTacToeGameModule } from './games/tic-tac-toe-game/tic-tac-toe-game.module';
import { ArrowDefenceGameModule } from './games/arrow-defence-game/arrow-defence-game.module';
import { PinballGameModule } from './games/pinball-game/pinball-game.module';
import { AsteroidGameModule } from './games/asteroid-game/asteroid-game.module';
import { HighwayRaceGameModule } from './games/highway-race-game/highway-race-game.module';
import { PacmanGameModule } from './games/pacman-game/pacman-game.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TicTacToeGameModule,
    ArrowDefenceGameModule,
    PacmanGameModule,
    PinballGameModule,
    AsteroidGameModule,
    HighwayRaceGameModule,
  ],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
