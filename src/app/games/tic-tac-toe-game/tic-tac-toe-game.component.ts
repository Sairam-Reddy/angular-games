import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit {
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

  public computerMove(): void {
    this.moveTicTacToeAudio.play
  }
}
