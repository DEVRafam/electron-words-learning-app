import Word, { ProgressiveWord as _ProgressiveWord, WordType } from "@/types/Word";

export default class ProgressiveWord implements _ProgressiveWord {
    public progressStatus: "strong" | "mastered" | "weak" | null = null;
    public displayed: string;
    public expected: string;
    public type: WordType;

    public constructor(word: Word) {
        const { expected, displayed, type } = word;
        this.expected = expected;
        this.displayed = displayed;
        this.type = type;
    }

    public _determineProgress(mastered: Word[], strong: Word[], weak: Word[]) {
        const word: Word = {
            expected: this.expected,
            displayed: this.displayed,
            type: this.type,
        };
        if (strong.includes(word)) this.progressStatus = "strong";
        else if (weak.includes(word)) this.progressStatus = "weak";
        else if (mastered.includes(word)) this.progressStatus = "mastered";
        else this.progressStatus = null;
    }
}
