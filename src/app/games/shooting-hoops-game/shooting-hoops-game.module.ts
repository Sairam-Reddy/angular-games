import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShootingHoopsGameComponent } from './shooting-hoops-game.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ShootingHoopsGameComponent,
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [ShootingHoopsGameComponent],
  exports: [ShootingHoopsGameComponent],
})
export class ShootingHooGameModule {}
