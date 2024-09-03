import { Char } from "./char";

export interface Word {
    word: string;
    hands: string[];
    fingers: string[];
    rightHandPercentage: number;
    chars: Char[]
}
