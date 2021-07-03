import { GameplayDataFile } from "@/types/Gameplay";
import { dataToPreview } from "@/composable/datasets_manager/useLoader";
import loadEveryGamplayFileName from "@/composable//datasets_manager/__utils/loaders/loadEveryGamplayFileName";
import loadSingleGameplayFile from "@/composable//datasets_manager/__utils/loaders/loadSingleGameplayFile";
import determineGameplaysModifiedDate from "@/composable//datasets_manager/__utils/loaders/determineGameplaysModifiedDate";

export default async () => {
    dataToPreview.value = [];
    const names: string[] = await loadEveryGamplayFileName();

    for (const fileName of names) {
        const loadedFile: GameplayDataFile = await loadSingleGameplayFile(fileName);
        const { words, ...dataForPreview } = loadedFile;
        dataToPreview.value.push({
            fileName: fileName,
            wordsAmount: words.length,
            lastModified: await determineGameplaysModifiedDate(fileName),
            // title, description, icon, words:
            ...dataForPreview,
        });
    }
};
