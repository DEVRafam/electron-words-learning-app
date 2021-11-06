import { ref } from "vue";
import UseComparisons, { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";
// load utils
import _loadDatasets from "@/composable/statistics/certain/__utils/comparisons/loadDatasets";
// use utils
export const loadDatasets = _loadDatasets;
//
export const openComparsionPanel = ref<boolean>(false);
export const hasDataBeenLoaded = ref<boolean>(false);
export const datasetsOrderFilter = ref<"latestModified" | "newest" | "mostPlayed" | "highestScores">("latestModified");
export const datasets = ref<ComparisonsDataset[]>([]);

export const _reset = () => {
    openComparsionPanel.value = false;
    hasDataBeenLoaded.value = false;
    datasetsOrderFilter.value = "latestModified";
    datasets.value = [];
};

export default {
    // Properties:
    openComparsionPanel,
    hasDataBeenLoaded,
    datasets,
    datasetsOrderFilter,
    // Methods SYNC:
    // Methods ASYNC:
    loadDatasets,
} as UseComparisons;
