import path from "path";
import fse from "fs-extra";
import Word from "@/types/Word";
import { crucialWordsDirPath } from "@/composable/paths";
import { WordsProgress } from "@/types/compositions/statistics/_useCertain";

export default async (fileName: string, words: Word[]): Promise<WordsProgress> => {
    try {
        const result = {
            weak: [],
            mastered: [],
            strong: [],
            common: [],
        } as WordsProgress;

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

        words.forEach((word) => {
            const progress = determineProgress(word);
            if (!progress) result.common.push(word);
            else result[progress].push(word);
        });
        return result;
    } catch (_: unknown) {
        return {
            weak: [],
            mastered: [],
            strong: [],
            common: [],
        };
    }
};
