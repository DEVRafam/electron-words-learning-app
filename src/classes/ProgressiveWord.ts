import Word, { ProgressiveWord as _ProgressiveWord } from "@/types/Word";

export default class ProgressiveWord implements _ProgressiveWord {
    public progressStatus: "strong" | "mastered" | "weak" | null = null;
    public displayed: string;
    public expected: string;

    public constructor(word: Word) {
        const { expected, displayed } = word;
        this.expected = expected;
        this.displayed = displayed;
    }

    public _determineProgress(mastered: Word[], strong: Word[], weak: Word[]) {
        const word: Word = {
            expected: this.expected,
            displayed: this.displayed,
        };
        if (strong.find((word: Word) => word.expected === this.expected)) {
            this.progressStatus = "strong";
        } else if (weak.includes(word)) this.progressStatus = "weak";
        else if (mastered.includes(word)) this.progressStatus = "mastered";
        else this.progressStatus = null;
    }
}
