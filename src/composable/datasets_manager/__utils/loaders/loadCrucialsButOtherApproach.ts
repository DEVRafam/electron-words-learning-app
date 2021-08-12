import Word from "@/types/Word";
import path from "path";
import fse from "fs-extra";
import { crucialWordsDirPath } from "@/composable/paths";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";

export default async (): Promise<{ strong: Word[]; weak: Word[]; mastered: Word[] }> => {
    try {
        const crucialWordsFilePath = path.join(crucialWordsDirPath, datasetToModify.value?.fileName + ".json");
        const crucialWordsFile = await fse.readJSON(crucialWordsFilePath);
        const { strong, weak, mastered } = crucialWordsFile;

        const organize = (words: any[]): Word[] => {
            return words
                .map((item: any) => {
                    if (item.expected.length >= 3 && item.displayed.length >= 3) {
                        return { expected: item.expected, displayed: item.displayed } as Word;
                    } else return false;
                })
                .filter((item: Word | false) => item !== false) as Word[];
        };

        return {
            strong: organize(strong),
            weak: organize(weak),
            mastered: organize(mastered),
        };
    } catch (_) {
        return { strong: [], weak: [], mastered: [] };
    }
};
