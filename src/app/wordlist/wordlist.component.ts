import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Word } from '../models/word';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-wordlist',
  standalone: true,
  providers: [DataService],
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  public words: Word[] = [];
  public randomWords: Word[] = []; // Array to store the random subset

  // Define an EventEmitter to send the words array to the parent component
  @Output() wordsLoaded: EventEmitter<Word[]> = new EventEmitter();

  constructor(private wordService: DataService) { }

  ngOnInit() {
    this.wordService.getWords().subscribe(
      (data) => {
        this.words = data;
        this.randomWords = this.getRandomWords(this.words, 100); // Get a random subset of 10 words
        this.wordsLoaded.emit(this.randomWords); // Emit the words to the parent
      },
      (error) => {
        console.error('Error fetching words:', error);
      }
    );
  }

  getRandomWords(array: Word[], count: number): Word[] {
    const shuffled = array.slice(); // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(0, count); // Return the first `count` elements
  }
}
