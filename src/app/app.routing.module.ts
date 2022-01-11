import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'arrow-defence-game',
    loadChildren: () =>
      import('./games/arrow-defence-game/arrow-defence-game.module').then(
        (m) => m.ArrowDefenceGameModule
      ),
  },
  {
    path: 'asteroid-game',
    loadChildren: () =>
      import('./games/asteroid-game/asteroid-game.module').then(
        (m) => m.AsteroidGameModule
      ),
  },
  {
    path: 'pinball-game',
    loadChildren: () =>
      import('./games/pinball-game/pinball-game.module').then(
        (m) => m.PinballGameModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
