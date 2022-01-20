import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  ticTac = false;
  arrow = false;
  pinball = false;
  asteroid = false;
  pacman = false;
  highway = false;
  fullScreen = false;
}
