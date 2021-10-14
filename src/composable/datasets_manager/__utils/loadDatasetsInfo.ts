import router from "@/router/index";

import { GameplayDataFileForPreview } from "@/types/Gameplay";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";
import loadSingleGameplayFile from "@/composable/datasets_loaders/__utils/loadSingleGameplayFile";
import determineGameplaysTimes from "@/composable/datasets_loaders/__utils/determineGameplaysTimes";

export default async (): Promise<void> => {
    const { datasetsName } = router.currentRoute.value.params;
    if (router.currentRoute.value.query.createNewDataset) {
        datasetToModify.value = {
            title: "",
            description: "",
            icon: "__NONE__",
            pronunciationLanguage: false,
            fancyLetters: [],
            fileName: "",
            wordsAmount: 0,
            words: [],
            lastModified: "",
            createdAt: "",
            _justCreated: true, // IMPORTANT!!
            _rawTimes: {
                lastModified: 0,
                createdAt: 0,
            },
        };
    } else {
        const data = await loadSingleGameplayFile(datasetsName as string);
        const times = await determineGameplaysTimes(datasetsName as string);
        datasetToModify.value = {
            ...data, //
            ...times,
            fileName: datasetsName,
            wordsAmount: data.words.length,
        } as GameplayDataFileForPreview;
    }
};
