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
  answerStateEnum = AnswerState; // Exposing AnswerState for the template

  private maxRounds: number = 20; // Define um limite para o jogo
  private totalPokemon: number = 150; // Define o total de Pokémons disponíveis

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame(): void {
    this.score = 0;
    this.message = '';
    this.gameFinished = false;
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

  fetchPokemon(): void {
    if (this.score >= this.maxRounds) {
      this.gameFinished = true;
      this.message = 'Game Over! You have reached the maximum rounds.';
      return;
    }

    this.resetUI();

    const randomId = Math.floor(Math.random() * this.totalPokemon) + 1;
    this.currentPokemonId = randomId;

    this.pokemonService.fetchPokemonById(randomId).subscribe((response) => {
      this.silhouetteUrl = response.imageUrl;
      this.options = [...response.options]; // Garante que as opções corretas do backend são usadas
      this.setTemporaryState(1000);
    });
  }

  verifyGuess(guess: string): void {
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
}
