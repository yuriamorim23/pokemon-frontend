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
  // UI Properties
  silhouetteUrl: string = '';
  options: string[] = [];
  message: string = '';
  
  // Game State
  score: number = 0;
  gameStarted: boolean = false;
  gameFinished: boolean = false;
  loading: boolean = false;
  disableOptions: boolean = false;
  revealPokemon: boolean = false;
  answerState: AnswerState = AnswerState.None;
  answerStateEnum = AnswerState;

  // Time Management
  private readonly TOTAL_POKEMON = 350;
  private readonly TIMER_DURATION = 120;
  timeLeft: number = this.TIMER_DURATION;
  private timer: any;
  
  // Pokémon Data
  private availablePokemonIds: number[] = [];
  private currentPokemonId: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  /** Starts the game and resets all necessary states */
  startGame(): void {
    this.gameStarted = true;
    this.resetGame();
  }

  /** Resets the game and initializes required data */
  resetGame(): void {
    this.score = 0;
    this.message = '';
    this.gameFinished = false;
    this.timeLeft = this.TIMER_DURATION;
    
    this.initializePokemonIds();
    this.startTimer();
    this.fetchNextPokemon();
  }

  /** Initializes and shuffles the list of available Pokémon IDs */
  private initializePokemonIds(): void {
    this.availablePokemonIds = Array.from({ length: this.TOTAL_POKEMON }, (_, i) => i + 1);
    this.shuffleArray(this.availablePokemonIds);
  }

  /** Resets UI elements before displaying a new Pokémon */
  private resetUI(): void {
    this.message = '';
    this.loading = true;
    this.disableOptions = true;
    this.revealPokemon = false;
  }

  /** Temporarily changes the game state for a smoother UX */
  private setTemporaryState(duration: number, callback?: () => void): void {
    setTimeout(() => {
      this.loading = false;
      this.disableOptions = false;
      this.answerState = AnswerState.None;
      if (callback) callback();
    }, duration);
  }

  /** Starts the game timer */
  private startTimer(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.endGame();
      }
    }, 1000);
  }

  /** Ends the game and stops the timer */
  private endGame(): void {
    clearInterval(this.timer);
    this.gameFinished = true;
    this.message = '⏳ Time is up! Game Over!';
  }

  /** Fetches the next Pokémon */
  private fetchNextPokemon(): void {
    if (this.gameFinished || this.availablePokemonIds.length === 0) return;

    this.resetUI();
    this.currentPokemonId = this.availablePokemonIds.shift()!;

    this.pokemonService.fetchPokemonById(this.currentPokemonId).subscribe((response) => {
      this.silhouetteUrl = response.imageUrl;
      this.options = [...response.options];
      this.setTemporaryState(1000);
    });
  }

  /** Verifies the user's guess */
  verifyGuess(guess: string): void {
    if (this.gameFinished) return;
    
    this.disableOptions = true;
    this.pokemonService.verifyGuess(this.currentPokemonId, guess).subscribe((result) => {
      this.revealPokemon = true;
      this.answerState = result.correct ? AnswerState.Correct : AnswerState.Wrong;
      this.message = result.correct 
        ? `🎉 Correct! The Pokémon is ${result.trueName}. 🎉`
        : `😢 Wrong! The correct Pokémon was ${result.trueName}. 😢`;

      if (result.correct) this.score++;

      this.setTemporaryState(1500, () => this.fetchNextPokemon());
    });
  }

  /** Formats the remaining time for display */
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  /** Shuffles an array using the Fisher-Yates algorithm */
  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
