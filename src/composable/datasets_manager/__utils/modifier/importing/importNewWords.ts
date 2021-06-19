import { newWords } from "@/composable/datasets_manager/useModifier";
import fse from "fs-extra";
import Word from "@/types/Word";

class ImportData {
    protected content: Word[] = [];
    constructor(protected file: File) {}

    protected valideFile(): boolean {
        // file does not exist
        if (!this.file) return false;
        // inappropriate extension
        if (!["application/json", "text/plain"].includes(this.file.type)) return false;

        return true;
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
        throw new Error("Invalid input");
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
        // remove empty rows
        this.content = this.content.filter((word: Word) => word.expected.length >= 3 && word.displayed.length >= 3);
        // lowercase everything
        this.content = this.content.map((word: Word) => {
            return {
                expected: word.expected.toLocaleLowerCase(),
                displayed: word.displayed.toLocaleLowerCase(),
            };
        });
    }

    protected saveImportedWords() {
        newWords.value = [...newWords.value, ...this.content];
    }
    //
    //
    //
    async main() {
        try {
            if (!this.valideFile()) return;
            await this.loadFileContent();
            this.validateContent();
            this.saveImportedWords();
        } catch (e: unknown) {
            //
        }
    }
}

export default async (f: File) => await new ImportData(f).main();
