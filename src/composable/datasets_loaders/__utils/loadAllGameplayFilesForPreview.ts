import { GameplayDataFile } from "@/types/Gameplay";
import { dataToPreview } from "@/composable/datasets_loaders/useDatasetsLoader";
import loadEveryGamplayFileName from "@/composable/datasets_loaders/__utils/loadEveryGamplayFileName";
import loadSingleGameplayFile from "@/composable/datasets_loaders/__utils/loadSingleGameplayFile";
import determineGameplaysModifiedDate from "@/composable/datasets_loaders/__utils/determineGameplaysModifiedDate";

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
