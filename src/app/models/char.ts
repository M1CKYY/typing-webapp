// Needed pretty much just to track the status for css
// word- & charIndex are sugar
export interface Char {
    wordIndex: number | null;
    charIndex: number | null;
    char: string;
    status: "untyped" | "correct" | "marked" | "incorrect";
}