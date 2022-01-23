import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit, OnDestroy {
  private moveTicTacToeAudio: HTMLAudioElement;
  private winTicTacToeAudio: HTMLAudioElement;

  public ngOnInit(): void {
    this.moveTicTacToeAudio = new Audio();
    this.moveTicTacToeAudio.src =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/Move-Tic-Tac-Toe.mp3';
    this.moveTicTacToeAudio.load();

    this.winTicTacToeAudio = new Audio();
    this.winTicTacToeAudio.src =
      'https://stackblitz.com/files/angular-ivy-kbykxm/github/Sairam-Reddy/angular-games/master/src/assets/audio/Winning-Tic-Tac-Toe.mp3';
    this.winTicTacToeAudio.load();
  }

  public ngOnDestroy(): void {
    if (this.moveTicTacToeAudio) {
      this.moveTicTacToeAudio.pause();
      this.moveTicTacToeAudio = null;
    }

    if (this.winTicTacToeAudio) {
      this.winTicTacToeAudio.pause();
      this.winTicTacToeAudio = null;
    }
  }

  public playerMove(): void {
    this.moveTicTacToeAudio.play();
  }

  public computerMove(): void {
    this.moveTicTacToeAudio.play();
  }
}
