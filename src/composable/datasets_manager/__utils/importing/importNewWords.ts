import { ref } from "vue";
import fse from "fs-extra";
import Word, { NewWord, ArchivedWord } from "@/types/Word";
import { JSONFileSyntaxError, NoItemsToImport, InvalidFileExtensionError, TXTFileSyntaxError } from "@/classes/Errors";
import displayNotification from "@/composable/useNotification";
import { newWords, amountOfImportedWords, datasetArchivedWords, datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { importingResult } from "@/composable/datasets_manager/submodules/useImporting";

export const latestImportedWords = ref<NewWord[]>([]);

// eslint-disable-next-line
type PossibleErrors = JSONFileSyntaxError | NoItemsToImport | InvalidFileExtensionError | TXTFileSyntaxError | unknown;

class ImportData {
    protected readonly TXT_FILE_SEPARATOR = "- ";
    protected content: Word[] | NewWord[] = [];
    constructor(protected file: File) {}

    protected valideFileExtension() {
        if (!["application/json", "text/plain"].includes(this.file.type)) {
            throw new InvalidFileExtensionError();
        }
    }

    protected async loadJSON(): Promise<Word[]> {
        try {
            let content = await fse.readJSON(this.file.path);
            content = content.filter((row: Word) => row.expected && row.displayed) as Word[];
            return content.map((row: Word) => {
                const { expected, displayed } = row;
                return { expected, displayed, type: "pair" };
            });
        } catch (_: unknown) {
            throw new JSONFileSyntaxError();
        }
    }

    protected async loadTXT(): Promise<Word[]> {
        try {
            const content = (await fse.readFile(this.file.path)).toString("utf-8");
            return content
                .split("\n")
                .map((row: string) => {
                    // eslint-disable-next-line
                    const [expected, displayed, ..._] = row.split(this.TXT_FILE_SEPARATOR);
                    return { expected, displayed, type: "pair" } as Word;
                })
                .filter((word) => {
                    const expectedIsOk = word.expected && word.expected.length >= 3;
                    const displayedIsOk = word.displayed && word.displayed.length >= 3;
                    return expectedIsOk && displayedIsOk;
                });
        } catch (e: unknown) {
            throw new TXTFileSyntaxError();
        }
    }

    protected async loadFileContent() {
        this.content = this.file.type === "application/json" ? await this.loadJSON() : await this.loadTXT();
        if (this.content.length === 0) throw new NoItemsToImport();
    }

    protected validateContent() {
        // remove empty or too big rows
        this.content = this.content.filter((word: Word) => {
            const validate = (target: string): boolean => target.length >= 3 && target.length <= 255;
            return validate(word.displayed) && validate(word.expected);
        });
        // lowercase everything
        this.content = this.content.map((word: Word) => {
            return {
                expected: word.expected.toLocaleLowerCase(),
                displayed: word.displayed.toLocaleLowerCase(),
                type: word.type,
            };
        });
        // remove duplicates and already existings words
        this.content = this.content
            .withoutDuplicates()
            .filter((word: Word) => {
                // remove already existing words

                // at this point we have to make sure, that property is 100% array
                // dunno why, but typescript goes crazy without "..." operator
                return ![...(datasetCurrentWords.value as Word[])].includes({
                    expected: word.expected,
                    displayed: word.displayed,
                    type: word.type,
                });
            })
            .filter((word) => {
                // remove already imported words
                const _newWords = newWords.value.map((target: NewWord) => ({ expected: target.expected, displayed: target.displayed }));
                return !_newWords.includes(word);
            })
            .filter((word) => {
                // remove archived words
                return !(datasetArchivedWords.value as ArchivedWord[]).find((target) => target.displayed === word.displayed && target.expected === word.expected);
            });
        // add origin to content
        this.content = this.content.map((word: Word) => {
            (word as NewWord).origin = this.file.name;
            (word as NewWord).condition = "positive";
            return word as NewWord;
        }) as NewWord[];
    }

    protected saveImportedWords() {
        if (this.content.length === 0) throw new NoItemsToImport();
        newWords.value = [...(this.content as NewWord[]), ...newWords.value];
    }

    async main(): Promise<Word[]> {
        this.valideFileExtension();
        await this.loadFileContent();
        this.validateContent();
        this.saveImportedWords();
        return this.content;
    }
}

export default async (f: File) => {
    try {
        const importedWords = await new ImportData(f).main();
        //
        importingResult.value = "positive";
        amountOfImportedWords.value = importedWords.length;
        latestImportedWords.value = importedWords as NewWord[];
        //
        displayNotification("Importning result", `${importedWords.length} words have been imported successfully`, "positive", 500);
    } catch (e: PossibleErrors) {
        importingResult.value = "negative";

        if (e instanceof JSONFileSyntaxError) {
            return displayNotification("JSON syntax", "Invalid .json file syntax. Make sure it fits valid schema", "negative", 500);
        } else if (e instanceof NoItemsToImport) {
            return displayNotification("No items to import", "There are no items that can be imported. Some items might be already imported", "negative", 500);
        } else if (e instanceof InvalidFileExtensionError) {
            return displayNotification("Invalid extension", "Currently supported extensions: .txt, .json", "negative", 500);
        } else if (e instanceof TXTFileSyntaxError) {
            return displayNotification("TXT file syntax", "Invalid .txt file syntax. Make sure it fits valid schema", "negative", 500);
        }

        displayNotification("Error", "Unknown error has occurred", "negative", 500);
    }
};
