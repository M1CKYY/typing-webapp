import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '../models/word';
import { WordlistComponent } from '../wordlist/wordlist.component';

type Char = {
  wordIndex: number | null;
  charIndex: number | null;
  char: string;
  status: "untyped" | "correct" | "marked" | "incorrect";
}

@Component({
  selector: 'app-word-echo',
  standalone: true,
  imports: [FormsModule, WordlistComponent],
  templateUrl: './word-echo.component.html',
  styleUrl: './word-echo.component.css'
})
export class WordEchoComponent {
  // Will be read from json later on as word objects
  wordList: Word[] = [];  // This will be populated with words from WordlistComponent

  // Method to handle the wordsLoaded event from WordlistComponent
  onWordsLoaded(words: Word[]) {
    this.wordList = words;
    this.populateCharList()
    console.log('Words received in WordEchoComponent:', this.wordList);
  }
  error: any;

  // To know if word typed is correct and we can therefore go to the next
  word: string;

  // Judged (correct or incorrect) input from user
  inputText: string;

  // For mistake analyzation later on
  rawInput: string;

  wordIndex: number;
  charIndex: number;
  useOpenBox: boolean;
  charList: Char[];
  incorrectChars: Char[];


  populateCharList() {
    for (let i = 0; i < this.wordList.length; i++) {
      for (let j = 0; j < this.wordList[i].word.length; j++) {
        var char: Char = { wordIndex: i, charIndex: j, char: this.wordList[i].word[j], status: "untyped" };
        this.charList.push(char)
      }
      if (i !== this.wordList.length - 1) {
        var char: Char = { wordIndex: null, charIndex: null, char: " ", status: "untyped" }
        this.charList.push(char)
      }
    }
  }


  constructor() {
    this.word = ''
    this.inputText = ''
    this.rawInput = ''
    this.wordIndex = 0
    this.charIndex = 0
    this.charList = []
    this.incorrectChars = []
    this.useOpenBox = true
  }

  increaseWordIndex() {
    this.wordIndex += 1;
  }

  // Shouldnt be used (with current logic) as mistakes dont have to be deleted to continue typing
  backspace() {
    this.inputText = this.inputText.slice(0, -1)
    this.word = this.word.slice(0, -1)
    this.charIndex = this.charIndex > 0 ? this.charIndex - 1 : this.charIndex = 0
  }

  clear() {
    this.wordIndex = 0;
    this.charIndex = 0;
    this.word = "";
    this.inputText = "";
    this.charList.forEach(c => c.status = "untyped");
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!(event.key === 'Enter')) {
      this.rawInput += event.key
      if (event.key === this.charList[this.inputText.length].char) {
        if (this.charList[this.inputText.length].status !== "untyped") {
          this.charList[this.inputText.length].status === "marked" ? "marked" : "correct";
        } else {
          this.charList[this.inputText.length].status = "correct";
        }
        if (event.key === " " && this.word === this.wordList[this.wordIndex].word) {
          this.word = '';
          this.charIndex = 0;
          this.wordIndex += 1;
        } else {

          this.word += event.key;
          this.charIndex += 1;
        }
        this.inputText += event.key
        if (this.charList[this.inputText.length - 1].status === "marked") {
          this.charList[this.inputText.length - 1].status = "incorrect"
        }
      } else {
        this.charList[this.inputText.length].status = "marked";
        this.incorrectChars.push(this.charList[this.inputText.length])
      }
    }
  }
}

