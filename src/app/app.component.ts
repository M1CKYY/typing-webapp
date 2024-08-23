import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordEchoComponent } from "./word-echo/word-echo.component";
import { WordlistComponent } from "./wordlist/wordlist.component";
import '@fontsource/ubuntu-mono/400.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WordEchoComponent, WordlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'typing-project';
}
