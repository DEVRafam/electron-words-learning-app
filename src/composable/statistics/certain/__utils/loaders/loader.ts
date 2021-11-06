// utils
import loadDatasetsInfo from "./__loadDatasetsInfo";
import loadGameplaysHistory from "./__loadGameplaysHistory";
import loadCrucialWords from "./__loadCrucialWords";
import router from "@/router/index";
import { dataset, gamesHistory, wordsProgress } from "@/composable/statistics/certain/useCertain";
import determineGameplaysTimes from "@/composable/datasets_loaders/__utils/determineGameplaysTimes";
import distinguishDatasetsprogress from "@/composable/statistics/certain/__utils/comparisons/distinguishDatasetsprogress";
// types
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";

export default async (fileName: string | false = false): Promise<void | ComparisonsDataset> => {
    if (fileName === false) {
        const datasetsName = router.currentRoute.value.params.datasetsName as string;
        if (!datasetsName) return router.push({ path: "/" }) as unknown as void;
        //
        try {
            gamesHistory.value = [];
            dataset.value = await loadDatasetsInfo(datasetsName);
            gamesHistory.value = await loadGameplaysHistory(datasetsName);
            wordsProgress.value = await loadCrucialWords(datasetsName, dataset.value.words);
        } catch (e) {
            router.push({ path: "/" });
        }
    } else {
        const { words, ...dataset } = await loadDatasetsInfo(fileName);
        const { lastModified, createdAt, _rawTimes } = await determineGameplaysTimes(fileName);
        const wordsProgress = await loadCrucialWords(fileName, words);
        return {
            ...dataset,
            fileName,
            lastModified,
            createdAt,
            _rawTimes,
            wordsAmount: words.length,
            gamesHistory: await loadGameplaysHistory(fileName),
            progress: distinguishDatasetsprogress(wordsProgress, words.length),
        } as ComparisonsDataset;
    }
};
