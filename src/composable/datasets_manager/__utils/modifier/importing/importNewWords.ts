import { ref } from "vue";
import fse from "fs-extra";
import Word from "@/types/Word";
import { newWords, importingResult, amountOfImportedWords } from "@/composable/datasets_manager/useModifier";
import displayNotification from "@/composable/useNotification";

export const latestImportedWords = ref<Word[]>([]);

class JSONFileSyntaxError extends Error {}
class NoItemsToImport extends Error {}
class InvalidFileExtensionError extends Error {}
type PossibleErrors = JSONFileSyntaxError | NoItemsToImport | InvalidFileExtensionError | unknown;

class ImportData {
    protected readonly NOTIFICATION_DELAY = 500;
    protected content: Word[] = [];
    constructor(protected file: File) {}

    protected valideFileExtension() {
        if (!["application/json", "text/plain"].includes(this.file.type)) {
            throw new InvalidFileExtensionError();
        }
    }

    protected async loadJSON(): Promise<Word[]> {
        let content = await fse.readJSON(this.file.path);
        if (Array.isArray(content)) {
            content = content.filter((row) => row.expected && row.displayed) as Word[];
            return content.map((row: Word) => {
                const { expected, displayed } = row;
                return { expected, displayed };
            });
        }
        throw new JSONFileSyntaxError();
    }

    protected async loadTXT(): Promise<Word[]> {
        const content = (await fse.readFile(this.file.path)).toString("utf-8");
        return content.split("\n").map((row: string) => {
            const SEPARATOR = "- ";
            const splited = row.split(SEPARATOR);
            return {
                expected: splited[0],
                displayed: splited[1],
            };
        }) as Word[];
    }

    protected async loadFileContent() {
        this.content = this.file.type === "application/json" ? await this.loadJSON() : await this.loadTXT();
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
    }

    protected saveImportedWords() {
        if (this.content.length === 0) throw new NoItemsToImport();
        newWords.value = [...newWords.value, ...this.content];
    }

    protected handleErrorCodes(e: PossibleErrors) {
        let msg = "";
        let title = "";

        if (e instanceof JSONFileSyntaxError) {
            title = "JSON syntax";
            msg = "Invalid .json file syntax. Make sure it fits valid schema";
        } // ⚡
        else if (e instanceof NoItemsToImport) {
            title = "No items to import";
            msg = "There are no items that can be imported. Some items might be already imported";
        } // ⚡
        else if (e instanceof InvalidFileExtensionError) {
            title = "Invalid extension";
            msg = "Currently supported extensions: .txt, .json";
        }

        displayNotification(title, msg, "negative", this.NOTIFICATION_DELAY);
    }

    async main() {
        try {
            this.valideFileExtension();
            await this.loadFileContent();
            this.validateContent();
            this.saveImportedWords();

            importingResult.value = "positive";
            amountOfImportedWords.value = this.content.length;
            latestImportedWords.value = this.content;

            displayNotification("Importning result", `${this.content.length} words have been imported successfully`, "positive", this.NOTIFICATION_DELAY);
        } catch (e: PossibleErrors) {
            importingResult.value = "negative";
            this.handleErrorCodes(e);
        }
    }
}

export default async (f: File) => await new ImportData(f).main();
