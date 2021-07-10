import { ref } from "vue";
import fse from "fs-extra";
import Word from "@/types/Word";
import { datasetWords } from "@/composable/datasets_manager/useModifier";
import displayNotification from "@/composable/useNotification";
import { newWords, amountOfImportedWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
import { importingResult } from "@/composable/datasets_manager/useModifier-submodules/useImporting";

export const latestImportedWords = ref<Word[]>([]);

class JSONFileSyntaxError extends Error {}
class TXTFileSyntaxError extends Error {}
class NoItemsToImport extends Error {}
class InvalidFileExtensionError extends Error {}
// eslint-disable-next-line
type PossibleErrors = JSONFileSyntaxError | NoItemsToImport | InvalidFileExtensionError | TXTFileSyntaxError | unknown;

class ImportData {
    protected readonly TXT_FILE_SEPARATOR = "- ";
    protected content: Word[] = [];
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
                return { expected, displayed };
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
                    return { expected, displayed };
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
            };
        });
        // remove duplicates
        this.content = this.content.filter((word: Word) => {
            const index = newWords.value.findIndex((target: Word) => {
                return target.displayed === word.displayed && target.expected === word.expected;
            });
            return index === -1;
        });
        // remove already existings words
        this.content = this.content.filter((word: Word) => {
            const index = (datasetWords.value as Word[]).findIndex((target: Word) => {
                return target.displayed === word.displayed && target.expected === word.expected;
            });
            return index === -1;
        });
    }

    protected saveImportedWords() {
        if (this.content.length === 0) throw new NoItemsToImport();
        newWords.value = [...newWords.value, ...this.content];
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
        latestImportedWords.value = importedWords;
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
