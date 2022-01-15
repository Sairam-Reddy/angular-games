import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeGameComponent } from './tic-tac-toe-game.component';

const routes: Routes = [
  {
    path: '',
    component: TicTacToeGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TicTacToeGameComponent],
})
export class TicTacToeGameModule {}
