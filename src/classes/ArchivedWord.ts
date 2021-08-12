import Word, { ArchivedWord as _ArchivedWord } from "@/types/Word";
import ProgressiveWord from "./ProgressiveWord";

export default class ArchivedWord extends ProgressiveWord implements _ArchivedWord {
    public archivedAt: string = "";

    public constructor(word: Word) {
        super(word);
    }
}
