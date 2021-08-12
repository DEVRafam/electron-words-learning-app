import Word, { CurrentWord as _CurrentWord } from "@/types/Word";
import ProgressiveWord from "./ProgressiveWord";
import { wordsToDelete } from "@/composable/datasets_manager/submodules/useWordsManager";

export default class CurrentWord extends ProgressiveWord implements _CurrentWord {
    public modifications: Word;
    private _originalData: Word;

    public constructor(word: Word) {
        const { expected, displayed } = word;
        super(word);

        this.modifications = {
            expected: expected,
            displayed: displayed,
        };
        this._originalData = {
            expected: expected,
            displayed: displayed,
        };
    }

    public hasBeenModified(): boolean {
        const displayedHasBeenEdited = this._originalData.displayed !== this.displayed;
        const expectationHasBeenEdited = this._originalData.expected !== this.expected;
        return expectationHasBeenEdited || displayedHasBeenEdited;
    }

    public isInDeletingList(): boolean {
        return wordsToDelete.value.includes(this);
    }

    public undoModifications() {
        this.expected = this._originalData.expected;
        this.displayed = this._originalData.displayed;
    }
}
