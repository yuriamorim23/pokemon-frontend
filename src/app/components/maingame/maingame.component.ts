import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

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
  isCorrect: boolean = false;
  isWrong: boolean = false;
  availablePokemonIds: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  gameFinished: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchRandomPokemon();
  }

  fetchRandomPokemon(): void {
    if (this.availablePokemonIds.length === 0) {
      this.gameFinished = true;
      this.loading = false;
      this.message = 'Game over! You have guessed all Pokémon.';
      return;
    }

    this.message = '';
    this.loading = true;
    this.disableOptions = true;
    this.revealPokemon = false;

    const randomIndex = Math.floor(Math.random() * this.availablePokemonIds.length);
    const randomId = this.availablePokemonIds.splice(randomIndex, 1)[0];

    this.pokemonService.fetchRandomPokemon().subscribe((response) => {
      this.silhouetteUrl = response.silhouetteImageUrl;
      this.options = response.options;
      this.currentPokemonId = response.id;

      setTimeout(() => {
        this.loading = false;
        this.disableOptions = false;
      }, 1000);
    });
  }

  verifyGuess(guess: string): void {
    this.disableOptions = true;

    this.pokemonService.verifyGuess(this.currentPokemonId, guess).subscribe((result) => {
      this.revealPokemon = true;

      if (result.correct) {
        this.message = `🎉 Correct! The Pokémon is ${result.trueName}. 🎉`;
        this.score++;
        this.isCorrect = true;
        this.isWrong = false;
      } else {
        this.message = `😢 Wrong! The correct Pokémon was ${result.trueName}. 😢`;
        this.isCorrect = false;
        this.isWrong = true;
      }

      setTimeout(() => {
        this.isCorrect = false;
        this.isWrong = false;
        this.fetchRandomPokemon();
      }, 1500);
    });
  }

  restartGame(): void {
    this.availablePokemonIds = Array.from({ length: 50 }, (_, i) => i + 1); // Reinicia os IDs
    this.score = 0;
    this.message = '';
    this.gameFinished = false;
    this.fetchRandomPokemon();
  }
}