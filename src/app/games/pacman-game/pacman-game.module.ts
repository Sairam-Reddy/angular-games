import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacmanGameComponent } from './pacman-game.component';

const routes: Routes = [
  {
    path: '',
    component: PacmanGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PacmanGameComponent],
  exports: [PacmanGameComponent],
})
export class PacmanGameModule {}
