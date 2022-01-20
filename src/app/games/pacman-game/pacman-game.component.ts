import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  Input,
} from '@angular/core';
import { Pacman } from './models/pacman.model';

@Component({
  selector: 'app-pacman-game',
  templateUrl: './pacman-game.component.html',
  styleUrls: ['./pacman-game.component.scss'],
})
export class PacmanGameComponent implements AfterViewInit, OnDestroy {
  @Input() previewOnly: boolean;
  @ViewChild('pacmanElement') pacmanElement: ElementRef;
  /*
   * fix looped audio
   * add fruits + levels
   * fix what happens when a ghost is eaten (should go back to base)
   * do proper ghost mechanics (blinky/wimpy etc)
   */

  public pacman: Pacman;

  public constructor() {}

  ngAfterViewInit(): void {
    this.pacman = new Pacman();
    const url =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/';
    this.pacman.init(this.pacmanElement.nativeElement, url, this.previewOnly);
  }

  ngOnDestroy(): void {
    if (this.pacman) {
      this.pacman.destroy();
    }
  }
}
