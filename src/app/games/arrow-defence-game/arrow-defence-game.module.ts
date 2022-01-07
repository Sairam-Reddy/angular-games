import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArrowDefenceGameComponent } from './arrow-defence-game.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ArrowDefenceGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [ArrowDefenceGameComponent],
})
export class ArrowDefenceGameModule {}
