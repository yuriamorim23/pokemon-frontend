import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

enum AnswerState {
  Correct,
  Wrong,
  None
}

@Component({
  selector: 'app-maingame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maingame.component.html',
  styleUrls: ['./maingame.component.scss'],
})
export class MainGameComponent implements OnInit {
  silhouetteUrl: string = '';
  options: string[] = [];
  currentPokemonId: number = 0;
  message: string = '';
  score: number = 0;
  loading: boolean = false;
  disableOptions: boolean = false;
  revealPokemon: boolean = false;
  answerState: AnswerState = AnswerState.None;
  gameFinished: boolean = false;
  gameStarted: boolean = false; // Controls if the game has started
  answerStateEnum = AnswerState; 

  private totalPokemon: number = 150;
  private timerDuration: number = 120;
  timeLeft: number = this.timerDuration;
  private timer: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  startGame(): void {
    this.gameStarted = true;
    this.resetGame();
  }

  resetGame(): void {
    this.score = 0;
    this.message = '';
    this.gameFinished = false;
    this.timeLeft = this.timerDuration;
    this.startTimer();
    this.fetchPokemon();
  }

  resetUI(): void {
    this.message = '';
    this.loading = true;
    this.disableOptions = true;
    this.revealPokemon = false;
  }

  setTemporaryState(duration: number): void {
    setTimeout(() => {
      this.loading = false;
      this.disableOptions = false;
      this.answerState = AnswerState.None;
    }, duration);
  }

  startTimer(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  endGame(): void {
    clearInterval(this.timer);
    this.gameFinished = true;
    this.message = '⏳ Time is up! Game Over!';
  }

  fetchPokemon(): void {
    if (this.gameFinished) {
      return;
    }

    this.resetUI();

    const randomId = Math.floor(Math.random() * this.totalPokemon) + 1;
    this.currentPokemonId = randomId;

    this.pokemonService.fetchPokemonById(randomId).subscribe((response) => {
      this.silhouetteUrl = response.imageUrl;
      this.options = [...response.options];
      this.setTemporaryState(1000);
    });
  }

  verifyGuess(guess: string): void {
    if (this.gameFinished) {
      return;
    }

    this.disableOptions = true;

    this.pokemonService.verifyGuess(this.currentPokemonId, guess).subscribe((result) => {
      this.revealPokemon = true;
      this.answerState = result.correct ? AnswerState.Correct : AnswerState.Wrong;
      this.message = result.correct 
        ? `🎉 Correct! The Pokémon is ${result.trueName}. 🎉`
        : `😢 Wrong! The correct Pokémon was ${result.trueName}. 😢`;
      
      if (result.correct) this.score++;

      this.setTemporaryState(1500);
      setTimeout(() => this.fetchPokemon(), 1500);
    });
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
