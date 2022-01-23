import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent {
  private moveTicTacToeAudio: HTMLAudioElement;
  private winTicTacToeAudio: HTMLAudioElement;

  public computerMove(): void {}
}
