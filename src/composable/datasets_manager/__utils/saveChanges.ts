// libraries
import path from "path";
import fse from "fs-extra";
// types
import { DatasetFile } from "@/types/Dataset";
import Word, { ArchivedWord, CurrentWord } from "@/types/Word";
// properties
import { dataToPreview } from "@/composable/datasets_loaders/useDatasetsLoader";
import { dataDirPath, iconsPath, archivePath, wordsTypeImagePath } from "@/composable/paths";
import { datasetToModify, blockSaveButton, isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";
import { title, description, fancyLetters, iconName, customIcon, language } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { wordsToDelete, newWords, wordsToRestore, datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
// tools
import router from "@/router/index";
import displayNotification from "@/composable/useNotification";
import { importingResult } from "@/composable/datasets_manager/submodules/useImporting";
import { loadDatasetsInfo } from "@/composable/datasets_manager/useModifier";
import useSlugGenerator from "@/composable/useSlugGenerator";

class SaveChanges {
    protected dataToSave: DatasetFile = {} as DatasetFile;
    protected deletedWords: ArchivedWord[] = [];
    protected currentDate = "";
    protected fileName: string;

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
        this.fileName = !isDatasetJustCreated.value && datasetToModify.value ? datasetToModify.value.fileName : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    protected generateWords() {
        const __generalizeWordsArray = (wordsList: Word[]): Word[] =>
            wordsList.map((word) => {
                return {
                    expected: word.expected,
                    displayed: word.displayed,
                    type: word.type,
                };
            });

        this.dataToSave.words = __generalizeWordsArray(this.dataToSave.words);
        const transformedNewWords = __generalizeWordsArray(newWords.value);
        //
        if (!isDatasetJustCreated.value) {
            // remove words
            wordsToDelete.value.forEach((word: Word) => {
                const index = this.dataToSave.words.findIndex((target) => {
                    return target.displayed === word.displayed && target.expected === word.expected;
                });

                this.deletedWords.push({
                    ...this.dataToSave.words[index],
                    archivedAt: this.currentDate,
                });

                this.dataToSave.words.splice(index, 1);
            });
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
        }
        // add words
        this.dataToSave.words = [...transformedNewWords, ...this.dataToSave.words];
        this.dataToSave.words = this.dataToSave.words.withoutDuplicates();
    }

    protected async catchAndStoreAllWordsImages() {
        await fse.ensureDir(path.join(wordsTypeImagePath, this.fileName));
        // find words, that possess unstored images
        const fromCurrentWords = datasetCurrentWords.value?.filter((target) => target._image instanceof File) as CurrentWord[];
        for (const item of fromCurrentWords) {
            const image = item._image as File;
            const imageName = `${useSlugGenerator(item.expected, false)}.${image.name.split(".")[1]}`;
            await fse.copy(image.path, path.join(wordsTypeImagePath, this.fileName, imageName));
            // update image URL to the generated image name
            const index = this.dataToSave.words.findIndex((target) => target.expected === item.expected);
            this.dataToSave.words[index].displayed = imageName;
        }
    }

    protected async tackleCustomIcon() {
        if (customIcon.value instanceof File) {
            const { name } = customIcon.value;
            await fse.copy(customIcon.value.path, path.join(iconsPath, name));
            this.dataToSave.icon = name;
        }
    }

    protected async archiveDeletedWords() {
        const p = path.join(archivePath, this.fileName + ".json");
        let currentArchive: ArchivedWord[] = [];
        if (!isDatasetJustCreated.value) {
            // try to find and load dataset's archive
            try {
                currentArchive = (await fse.readJSON(p)) as ArchivedWord[];
            } catch (_: unknown) {
                //
            }
            // remove all restored words from current archive
            wordsToRestore.value.forEach((word) => currentArchive.remove(word));
        }
        // save changes in the archive
        const wordsToArchive = [...this.deletedWords, ...currentArchive].withoutDuplicates();
        await fse.writeJson(p, wordsToArchive);
    }

    protected updateDataToPreview() {
        const dataset = {
            ...this.dataToSave,
            fileName: this.fileName,
            wordsAmount: this.dataToSave.words.length,
            lastModified: this.currentDate,
            createdAt: datasetToModify.value?.createdAt as string,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _rawTimes: datasetToModify.value?._rawTimes as any,
        };
        // New dataset is creating rn, so there is no purpose to find index, simply push new data into array would be sufficient
        if (isDatasetJustCreated.value) {
            dataset.createdAt = this.currentDate;
            dataset._rawTimes = {
                lastModified: Date.now(),
                createdAt: Date.now(),
            };
            dataToPreview.value.push(dataset);
        }
        // We're modifying already existing  dataset, so all we need is just find his index and replace with fresher version
        else {
            const index = dataToPreview.value.findIndex((target) => {
                return target.fileName === this.fileName;
            });
            dataToPreview.value[index] = dataset;
        }
    }

    protected async save() {
        const p = path.join(dataDirPath, this.fileName + ".json");
        await fse.writeJSON(p, this.dataToSave);
    }

    async main() {
        this.generateWords();
        await this.catchAndStoreAllWordsImages();
        await this.tackleCustomIcon();
        await this.archiveDeletedWords();
        await this.save();
        this.updateDataToPreview();

        if (isDatasetJustCreated.value) {
            router.push({
                name: "DatasetsList",
            });
        } else {
            await loadDatasetsInfo();
            importingResult.value = "positive";
        }
    }
}

export default async (): Promise<boolean> => {
    if (blockSaveButton.value) return false;

    try {
        await new SaveChanges().main();
        displayNotification("Dataset updated", "All changes have been saved successfully", "positive");
        return true;
    } catch (e: unknown) {
        displayNotification("Something went wrong", "Unknown error has occured while updating dataset", "negative");
        return false;
    }
};
