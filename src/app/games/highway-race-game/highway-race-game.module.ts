import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HighwayRaceGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [HighwayRaceGameComponent],
})
export class HighwayRaceGameModule {}
