import Word, { CurrentWord as _CurrentWord } from "@/types/Word";
import ProgressiveWord from "./ProgressiveWord";
import { wordsToDelete } from "@/composable/datasets_manager/submodules/useWordsManager";

export default class CurrentWord extends ProgressiveWord implements _CurrentWord {
    public modifications: Word;
    public _image: File | null = null;
    private _originalData: Word;

    public constructor(word: Word) {
        super(word);
        const { expected, displayed, type } = word;

        this.modifications = {
            expected: expected,
            displayed: displayed,
            type: type,
        };
        this._originalData = {
            expected: expected,
            displayed: displayed,
            type: type,
        };
    }

    public hasBeenModified(target: "displayed" | "expected" | "type"): boolean {
        if (target === "displayed") return this._originalData.displayed !== this.displayed;
        else if (target === "expected") return this._originalData.expected !== this.expected;
        else return this._originalData.type !== this.type;
    }

    public resetProperty(target: "displayed" | "expected" | "type") {
        if (target === "displayed") {
            this.displayed = this._originalData.displayed;
            this.modifications.displayed = this._originalData.displayed;
            if (this.modifications.type === "image" || this.type === "image") {
                this.resetProperty("type");
            }
        } else if (target === "expected") {
            this.expected = this._originalData.expected;
            this.modifications.expected = this._originalData.expected;
            if (this.modifications.type === "irregular" || this.type === "irregular") {
                this.resetProperty("type");
            }
        } else if (target === "type") {
            this.type = this._originalData.type;
            this.modifications.type = this._originalData.type;
            this._image = null;
        }
    }

    public isInDeletingList(): boolean {
        return wordsToDelete.value.includes(this);
    }

    public undoModifications() {
        this.expected = this._originalData.expected;
        this.displayed = this._originalData.displayed;
    }

    public wasOriginallyAnImage(): boolean {
        return this._originalData.type === "image";
    }
}
