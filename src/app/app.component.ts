import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainGameComponent } from './components/maingame/maingame.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-frontend';
}
