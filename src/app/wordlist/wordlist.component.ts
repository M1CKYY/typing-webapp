import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Word } from '../models/word';
import { DataService } from '../services/data.service';
import { ShuffledArrayDuplicatesService } from '../services/shuffled-array-duplicates.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordlist',
  standalone: true,
  providers: [],
  imports: [FormsModule],
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  public words: Word[] = [];
  public filteredWords: Word[] = []; // Array to store the filtered words
  public randomFilteredWords: Word[] = []; // Array to store the random subset

  public rightHandPercentage: number = 50;

  // Define an EventEmitter to send the words array to the parent component
  @Output() wordsLoaded: EventEmitter<Word[]> = new EventEmitter();

  constructor(private wordService: DataService, private shuffle: ShuffledArrayDuplicatesService) { }

  ngOnInit() {
    this.instanciateWords()
  }

  instanciateWords() {
    this.wordService.getWords().subscribe(
      (data) => {
        this.words = data.map(item => ({
          word: item.word,
          hands: item.hands,
          fingers: item.fingers,
          rightHandPercentage: item.rightHandPercentage,
          chars: [] // Initialize chars as an empty array or with appropriate logic
        }));

        this.filterWords();

        this.randomFilteredWords = this.shuffle.getRandomWords(this.filteredWords, 50);
        this.wordsLoaded.emit(this.randomFilteredWords); // Emit the filtered words to the parent

      },
      (error) => {
        console.error('Error fetching words:', error);
      }
    );
  }

  filterWords() {
    this.filteredWords = this.words.filter(word => word.rightHandPercentage >= this.rightHandPercentage);
  }
}
