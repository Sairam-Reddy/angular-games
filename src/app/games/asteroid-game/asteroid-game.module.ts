import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsteroidGameComponent } from './asteroid-game.component';

const routes: Routes = [
  {
    path: '',
    component: AsteroidGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AsteroidGameComponent],
})
export class AsteroidGameModule {}
