import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinballGameComponent } from './pinball-game.component';

const routes: Routes = [
  {
    path: '',
    component: PinballGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PinballGameComponent],
  exports: [PinballGameComponent],
})
export class PinballGameModule {}
