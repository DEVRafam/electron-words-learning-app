import fse from "fs-extra";
import InputFile from "@/types/FileInputEvent";
import { ImportedDataset } from "@/types/Gameplay";
import { newWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { title, description, fancyLetters, language } from "@/composable/datasets_manager/submodules/useGeneralInformations";

import Word, { NewWord } from "@/types/Word";
// utils
import LoadedFileStructureValidator from "./_loadedFileStructureValidator";

import { JSONFileSyntaxError, InvalidFileExtensionError } from "@/classes/Errors";

class ImportDataset {
    protected fileContent: ImportedDataset = {} as ImportedDataset;
    public constructor(protected file: File) {}

    protected validateFileExtension(): void {
        if (this.file.type !== "application/json") throw new InvalidFileExtensionError();
    }

    protected async loadFileContent() {
        this.fileContent = await fse.readJSON(this.file.path);
    }

    protected validateFileContent(): void {
        try {
            new LoadedFileStructureValidator(this.fileContent).main();
        } catch (e: JSONFileSyntaxError | unknown) {
            if (e instanceof JSONFileSyntaxError) {
                throw new JSONFileSyntaxError();
            }
        }
    }

    protected useImportedDataset(): void {
        // words
        const { name: fileName } = this.file;
        this.fileContent.words.forEach((word: Word) =>
            newWords.value.unshift({
                expected: word.expected,
                displayed: word.displayed,
                condition: "positive",
                origin: fileName,
            } as NewWord)
        );

        fancyLetters.value = [...fancyLetters.value, ...this.fileContent.fancyLetters];
        title.value = this.fileContent.title;
        description.value = this.fileContent.description;
        language.value = this.fileContent.pronunciationLanguage;
    }

    public async main() {
        try {
            this.validateFileExtension();
            await this.loadFileContent();
            this.validateFileContent();
            this.useImportedDataset();
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default async (e: InputFile): Promise<boolean> => await new ImportDataset(e.target.files[0]).main();
