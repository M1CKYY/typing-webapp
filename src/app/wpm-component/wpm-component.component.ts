import { Component } from '@angular/core';

@Component({
  selector: 'app-wpm-component',
  standalone: true,
  imports: [],
  templateUrl: './wpm-component.component.html',
  styleUrl: './wpm-component.component.css'
})
export class WpmComponentComponent {
  startTime: number | null = null;
  elapsedTime: number | null = null;

  startEvent() {
    this.startTime = Date.now(); // Capture the start time
    this.elapsedTime = null;
  }

  endEvent() {
    if (this.startTime) {
      this.elapsedTime = Date.now() - this.startTime; // Calculate elapsed time
    }
  }
}
