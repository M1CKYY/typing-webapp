import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Word } from '../models/word';
import { Char } from '../models/char';
import { WordlistComponent } from '../wordlist/wordlist.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-word-echo',
  standalone: true,
  imports: [FormsModule, WordlistComponent, NgClass],
  templateUrl: './word-echo.component.html',
  styleUrl: './word-echo.component.css'
})
export class WordEchoComponent {
  // Will be read from json later on as word objects
  wordList: Word[] = [];  // This will be populated with words from WordlistComponent


  // To know if word typed is correct and we can therefore go to the next
  word: string;

  // Judged (correct or incorrect) input from user
  inputText: string;

  // For mistake analyzation later on
  rawInput: string;

  wordIndex: number;
  charIndex: number;
  useSpace: boolean;
  charList: Char[];
  incorrectChars: Char[];

  constructor() {
    this.word = ''
    this.inputText = ''
    this.rawInput = ''
    this.wordIndex = 0
    this.charIndex = 0
    this.charList = []
    this.incorrectChars = []
    this.useSpace = false
  }

  // Method to handle the wordsLoaded event from WordlistComponent
  onWordsLoaded(words: Word[]) {
    this.wordList = words;
    this.populateCharList()
  }

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
        this.inputText += event.key
        if (this.charList[this.inputText.length - 1].status === "marked") {
          this.charList[this.inputText.length - 1].status = "incorrect"
        }

        if (event.key === " " && this.word === this.wordList[this.wordIndex].word) {
          this.word = '';
          this.charIndex = 0;
          this.wordIndex += 1;
        } else {
          this.word += event.key;
          this.charIndex += 1;
        }
      } else {
        this.charList[this.inputText.length].status = "marked";
        this.incorrectChars.push(this.charList[this.inputText.length])
      }
    }
  }

  clear() {
    this.wordIndex = 0;
    this.charIndex = 0;
    this.word = "";
    this.inputText = "";
    this.rawInput = "";
    this.incorrectChars = []
    this.charList.forEach(c => c.status = "untyped");
  }

  toggleSpace() {
    this.useSpace = !this.useSpace;
  }

  replaceSpacesWithOpenBox() {
    this.useSpace = !this.useSpace;
  }

  // Shouldnt be used (with current logic) as mistakes dont have to be deleted to continue typing
  backspace() {
    this.inputText = this.inputText.slice(0, -1)
    this.word = this.word.slice(0, -1)
    this.charIndex = this.charIndex > 0 ? this.charIndex - 1 : this.charIndex = 0
  }
}

