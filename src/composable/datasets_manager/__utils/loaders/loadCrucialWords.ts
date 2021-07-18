import path from "path";
import fse from "fs-extra";
import Word from "@/types/Word";
import { crucialWordsDirPath } from "@/composable/paths";
import { datasetToModify, datasetWordsProgress, datasetCurrentWords } from "@/composable/datasets_manager/useModifier";

export default async () => {
    if (datasetWordsProgress.value === null && datasetToModify.value !== null) {
        try {
            const p = path.join(crucialWordsDirPath, datasetToModify.value?.fileName + ".json");
            const crucialWordsFile = await fse.readJSON(p);

            const determineProgress = (_word: Word): "weak" | "strong" | "mastered" | null => {
                if (datasetWordsProgress.value === null) return null;
                const { strong, weak, mastered } = crucialWordsFile;
                const word = JSON.parse(JSON.stringify(_word));

                if (JSON.parse(JSON.stringify(strong)).includes(word)) return "strong";
                else if (JSON.parse(JSON.stringify(weak)).includes(word)) return "weak";
                else if (JSON.parse(JSON.stringify(mastered)).includes(word)) return "mastered";
                return null;
            };
            datasetWordsProgress.value = {};
            datasetCurrentWords.value?.forEach((word: Word) => {
                (datasetWordsProgress.value as any)[word.expected] = determineProgress(word);
            });
        } catch (_: unknown) {
            //
        }
    }
};
