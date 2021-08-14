// libraries
import path from "path";
import fse from "fs-extra";
// types
import { GameplayDataFile } from "@/types/Gameplay";
import Word, { ArchivedWord } from "@/types/Word";
// properties
import { dataToPreview } from "@/composable/datasets_loaders/useDatasetsLoader";
import { dataDirPath, iconsPath, archivePath } from "@/composable/paths";
import { datasetToModify, previewModifySection, blockSaveButton } from "@/composable/datasets_manager/useModifier";
import { title, description, fancyLetters, iconName, customIcon, language } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { wordsToDelete, newWords, wordsToRestore, datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
// tools
import displayNotification from "@/composable/useNotification";

class SaveChanges {
    protected dataToSave: GameplayDataFile = {} as GameplayDataFile;
    protected deletedWords: ArchivedWord[] = [];
    protected currentDate = "";

    constructor() {
        this.currentDate = new Date().toLocaleString();
        this.dataToSave = {
            description: description.value,
            title: title.value,
            pronunciationLanguage: language.value,
            fancyLetters: fancyLetters.value,
            words: datasetCurrentWords.value as Word[],
            icon: iconName.value,
        };
    }

    protected generateWords() {
        // remove words
        wordsToDelete.value.forEach((word: Word) => {
            const index = this.dataToSave.words.indexOf(word);

            this.deletedWords.push({
                ...this.dataToSave.words[index],
                archivedAt: this.currentDate,
            });

            this.dataToSave.words.splice(index, 1);
        });
        // add words
        this.dataToSave.words = [...newWords.value, ...this.dataToSave.words];
        // restore words
        this.dataToSave.words = [
            ...wordsToRestore.value.map((word: ArchivedWord) => {
                // Type's transition from ArchivedWord to Word
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { archivedAt, ...rest } = word;
                return rest as Word;
            }),
            ...this.dataToSave.words,
        ];

        this.dataToSave.words = this.dataToSave.words.withoutDuplicates();
    }

    protected async tackleCustomIcon() {
        if (customIcon.value instanceof File) {
            const { name } = customIcon.value;
            await fse.copy(customIcon.value.path, path.join(iconsPath, name));
            this.dataToSave.icon = name;
        }
    }

    protected async archiveDeletedWords() {
        const p = path.join(archivePath, datasetToModify.value?.fileName + ".json");
        let currentArchive: ArchivedWord[] = [];
        // try to find and load dataset's archive
        try {
            currentArchive = (await fse.readJSON(p)) as ArchivedWord[];
        } catch (_: unknown) {
            //
        }
        // remove all restored words from current archive
        wordsToRestore.value.forEach((word) => currentArchive.remove(word));
        // save changes in the archive
        const wordsToArchive = [...this.deletedWords, ...currentArchive].withoutDuplicates();
        await fse.writeJson(p, wordsToArchive);
    }

    protected updateDataToPreview() {
        const index = dataToPreview.value.findIndex((target) => {
            return target.fileName === datasetToModify.value?.fileName;
        });
        dataToPreview.value[index] = {
            ...this.dataToSave,
            fileName: datasetToModify.value?.fileName as string,
            wordsAmount: this.dataToSave.words.length,
            lastModified: this.currentDate,
            createdAt: datasetToModify.value?.createdAt as string,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _rawTimes: datasetToModify.value?._rawTimes as any,
        };

        previewModifySection.value = false;
    }

    protected async save() {
        const p = path.join(dataDirPath, datasetToModify.value?.fileName + ".json");
        await fse.writeJSON(p, this.dataToSave);
    }

    async main() {
        this.generateWords();
        await this.tackleCustomIcon();
        await this.archiveDeletedWords();
        await this.save();
        this.updateDataToPreview();
    }
}

export default async () => {
    if (blockSaveButton.value) return;

    try {
        await new SaveChanges().main();
        displayNotification("Dataset updated", "All changes have been saved successfully", "positive");
    } catch (e: unknown) {
        displayNotification("Something went wrong", "Unknown error has occured while updating dataset", "negative");
    }
};
