import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShuffledArrayDuplicatesService {

  constructor() {
  }
  getRandomWords(array: any[], count: number): any[] {
    const shuffled = array.slice(); // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(0, count); // Return the first `count` elements
  }
}
