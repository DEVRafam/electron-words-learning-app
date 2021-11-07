import loadEveryGamplayFileName from "@/composable/datasets_loaders/__utils/loadEveryGamplayFileName";
import { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";
import { datasets, hasDataBeenLoaded, currentDatasetInDetails } from "@/composable/statistics/certain/submodules/useComparisons";
import loadDataset from "@/composable/statistics/certain/__utils/loaders/loader";

export default async (filename: string): Promise<void> => {
    if (hasDataBeenLoaded.value) return;
    const names: string[] = await loadEveryGamplayFileName();
    datasets.value = [];

    for (const name of names) {
        if (name === filename) {
            currentDatasetInDetails.value = (await loadDataset(name)) as ComparisonsDataset;
        } else {
            datasets.value.push((await loadDataset(name)) as ComparisonsDataset);
        }
    }

    hasDataBeenLoaded.value = true;
};
