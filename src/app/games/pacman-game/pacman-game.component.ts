import {
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import { Pacman } from './models/pacman.model';

@Component({
  selector: 'app-pacman-game',
  templateUrl: './pacman-game.component.html',
  styleUrls: ['./pacman-game.component.scss'],
})
export class PacmanGameComponent implements AfterViewInit {
  @ViewChild('pacmanElement') pacmanElement: ElementRef;
  /*
   * fix looped audio
   * add fruits + levels
   * fix what happens when a ghost is eaten (should go back to base)
   * do proper ghost mechanics (blinky/wimpy etc)
   */

  public pacman;

  ngAfterViewInit(): void {
    this.pacman = new Pacman();
    const url =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/';
    this.pacman.init(this.pacmanElement.nativeElement, url);
  }
}
