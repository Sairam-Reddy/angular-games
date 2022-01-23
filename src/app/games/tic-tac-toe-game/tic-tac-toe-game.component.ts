import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent implements OnInit, OnDestroy {
  
  private playerCells: Array<string> = [];
  private computerCells: Array<string> = [];
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

  public playerMove(cell: string): void {
    this.playerCells.push(cell);
    this.moveTicTacToeAudio.play();
    if (this.checkPlayerHasWon() || this.checkComputerHasWon()) {
      this.winTicTacToeAudio.play();
    }
  }

  public computerMove(cell: string): void {
    this.computerCells.push(cell);
    this.moveTicTacToeAudio.play();
    if (this.checkPlayerHasWon() || this.checkComputerHasWon()) {
      this.winTicTacToeAudio.play();
    }
  }

  public reset(): void {
    this.playerCells = [];
    this.computerCells = []
  }

  private checkPlayerHasWon(): boolean {
    return (
      (this.playerCells.some((x: string) => x === 'cell-0-x') &&
        this.playerCells.some((x: string) => x === 'cell-1-x') &&
        this.playerCells.some((x: string) => x === 'cell-2-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-3-x') &&
        this.playerCells.some((x: string) => x === 'cell-4-x') &&
        this.playerCells.some((x: string) => x === 'cell-5-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-6-x') &&
        this.playerCells.some((x: string) => x === 'cell-7-x') &&
        this.playerCells.some((x: string) => x === 'cell-8-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-0-x') &&
        this.playerCells.some((x: string) => x === 'cell-3-x') &&
        this.playerCells.some((x: string) => x === 'cell-6-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-1-x') &&
        this.playerCells.some((x: string) => x === 'cell-4-x') &&
        this.playerCells.some((x: string) => x === 'cell-7-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-2-x') &&
        this.playerCells.some((x: string) => x === 'cell-5-x') &&
        this.playerCells.some((x: string) => x === 'cell-8-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-0-x') &&
        this.playerCells.some((x: string) => x === 'cell-4-x') &&
        this.playerCells.some((x: string) => x === 'cell-8-x')) ||
      (this.playerCells.some((x: string) => x === 'cell-2-x') &&
        this.playerCells.some((x: string) => x === 'cell-4-x') &&
        this.playerCells.some((x: string) => x === 'cell-6-x'))
    );
  }

  private checkComputerHasWon(): boolean {
    return (
      (this.computerCells.some((x: string) => x === 'cell-0-o') &&
        this.computerCells.some((x: string) => x === 'cell-1-o') &&
        this.computerCells.some((x: string) => x === 'cell-2-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-3-o') &&
        this.computerCells.some((x: string) => x === 'cell-4-o') &&
        this.computerCells.some((x: string) => x === 'cell-5-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-6-o') &&
        this.computerCells.some((x: string) => x === 'cell-7-o') &&
        this.computerCells.some((x: string) => x === 'cell-8-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-0-o') &&
        this.computerCells.some((x: string) => x === 'cell-3-o') &&
        this.computerCells.some((x: string) => x === 'cell-6-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-1-o') &&
        this.computerCells.some((x: string) => x === 'cell-4-o') &&
        this.computerCells.some((x: string) => x === 'cell-7-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-2-o') &&
        this.computerCells.some((x: string) => x === 'cell-5-o') &&
        this.computerCells.some((x: string) => x === 'cell-8-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-0-o') &&
        this.computerCells.some((x: string) => x === 'cell-4-o') &&
        this.computerCells.some((x: string) => x === 'cell-8-o')) ||
      (this.computerCells.some((x: string) => x === 'cell-2-o') &&
        this.computerCells.some((x: string) => x === 'cell-4-o') &&
        this.computerCells.some((x: string) => x === 'cell-6-o'))
    );
  }
}
