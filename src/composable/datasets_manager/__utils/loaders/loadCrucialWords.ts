import path from "path";
import fse from "fs-extra";
import Word from "@/types/Word";
import { crucialWordsDirPath } from "@/composable/paths";
import { datasetToModify, isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";
import { datasetCurrentWords, datasetWordsProgress } from "@/composable/datasets_manager/submodules/useWordsManager";

export default async () => {
    if (isDatasetJustCreated.value) return;
    try {
        if (datasetWordsProgress.value === null && datasetToModify.value !== null) {
            const crucialWordsFilePath = path.join(crucialWordsDirPath, datasetToModify.value?.fileName + ".json");
            const crucialWordsFile = await fse.readJSON(crucialWordsFilePath);
            const { strong, weak, mastered } = crucialWordsFile;

            const determineProgress = (_word: Word): "weak" | "strong" | "mastered" | null => {
                if (datasetWordsProgress.value === null || _word === null) return null;
                const word = JSON.parse(JSON.stringify(_word));

                if (JSON.parse(JSON.stringify(strong)).includes(word)) return "strong";
                else if (JSON.parse(JSON.stringify(weak)).includes(word)) return "weak";
                else if (JSON.parse(JSON.stringify(mastered)).includes(word)) return "mastered";
                return null;
            };

            if (datasetCurrentWords.value instanceof Array) {
                datasetWordsProgress.value = {};
                // we want to determine progress for as many words as possible
                const words = [...datasetCurrentWords.value, ...weak, ...strong, ...mastered].withoutDuplicates() as Word[];
                words.forEach((word: Word) => {
                    if (word) {
                        const progress = determineProgress(word);
                        if (progress) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (datasetWordsProgress.value as any)[word.expected] = progress;
                        }
                    }
                });
            }
        }
    } catch (_: unknown) {
        //
    }
};
