import fse from "fs-extra";
import path from "path";
import { crucialWordsDirPath } from "@/composable/paths";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word from "@/types/Word";

interface Response {
    level: "mastered" | "weak" | "strong" | "NONE";
    percentages: number;
}

export default async (dataset: GameplayDataFileForPreview): Promise<Response> => {
    try {
        const crucialWordsPath = path.join(crucialWordsDirPath, dataset.fileName + ".json");
        const crucialWordsFile = await fse.readJSON(crucialWordsPath);
        let { strong, weak, mastered } = crucialWordsFile;
        const parsedDatasetsWords = JSON.parse(JSON.stringify(dataset.words));
        strong = strong.filter((target: Word) => parsedDatasetsWords.includes(target));
        mastered = mastered.filter((target: Word) => parsedDatasetsWords.includes(target));
        weak = weak.filter((target: Word) => parsedDatasetsWords.includes(target));

        const sl = strong.length;
        const ml = mastered.length;
        const wl = weak.length;

        if (!sl && !wl && !ml) return { level: "NONE", percentages: 0 };
        else if (ml >= sl && ml >= wl) return { level: "mastered", percentages: Math.round((ml * 100) / dataset.wordsAmount) };
        else if (sl >= ml && sl >= wl) return { level: "strong", percentages: Math.round((sl * 100) / dataset.wordsAmount) };
        else return { level: "weak", percentages: Math.round((wl * 100) / dataset.wordsAmount) };
    } catch {
        return { level: "NONE", percentages: 0 };
    }
};
