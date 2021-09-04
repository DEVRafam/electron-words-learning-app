import path from "path";
import fse from "fs-extra";
import Word from "@/types/Word";
import { crucialWordsDirPath } from "@/composable/paths";
import { dataset, wordsProgress } from "@/composable/statistics/certain/useCertain";

export default async (fileName: string) => {
    try {
        const crucialWordsFilePath = path.join(crucialWordsDirPath, fileName + ".json");
        const crucialWordsFile = await fse.readJSON(crucialWordsFilePath);
        const { strong, weak, mastered } = crucialWordsFile;

        const determineProgress = (_word: Word): "weak" | "strong" | "mastered" | null => {
            if (_word === null) return null;
            const word = JSON.parse(JSON.stringify(_word));

            if (JSON.parse(JSON.stringify(strong)).includes(word)) return "strong";
            else if (JSON.parse(JSON.stringify(weak)).includes(word)) return "weak";
            else if (JSON.parse(JSON.stringify(mastered)).includes(word)) return "mastered";
            return null;
        };

        dataset.value?.words.forEach((word) => {
            const progress = determineProgress(word);
            if (!progress) wordsProgress.value.common.push(word);
            else wordsProgress.value[progress].push(word);
        });
    } catch (_: unknown) {
        //
    }
};
