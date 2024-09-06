import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Char } from '../models/char';

@Component({
  selector: 'app-char',
  template: `
    <span 
      [class.nan]="char.status === 'untyped'"
      [class.incorrect]="char.status === 'incorrect'"
      [class.correct]="char.status === 'correct'"
      [ngClass]="{ 'current-char': isCurrent }">
      {{ getCharDisplay(char, useSpace) }}
    </span>
  `,
  styles: `
  span {
  font-family: "Ubuntu Mono", monospace;
    letter-spacing: -0.25em;
  }
  .current-char {
    border-bottom: 2px solid black;
    padding-bottom: 2px;
  }

  .incorrect {
    color: red;
  }

  .correct {
    color: gray;
  }

  .nan {
    color: black;
  }
  `,
  imports: [CommonModule],
  standalone: true,
})

export class CharComponent {
  @Input() char!: Char;
  @Input() isCurrent: boolean = false;
  @Input() useSpace: boolean = false;

  getCharDisplay(char: Char, useSpace: boolean): string {
    if (char.char === ' ') {
      return useSpace ? '\u00A0' : '\u2423'; // No-break space or Open box
    }
    return char.char;
  }
}
