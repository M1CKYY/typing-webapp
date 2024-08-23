export interface Char {
    wordIndex: number | null;
    charIndex: number | null;
    char: string;
    status: "untyped" | "correct" | "marked" | "incorrect";
}