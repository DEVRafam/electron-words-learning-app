import { ref, watch } from "vue";
import UseComparisons, { ComparisonsDataset } from "@/types/compositions/statistics/_useComparisons";
// load utils
import _loadDatasets from "@/composable/statistics/certain/__utils/comparisons/loadDatasets";
// use utils
export const loadDatasets = _loadDatasets;
//
export const openComparsionPanel = ref<boolean>(false);
export const hasDataBeenLoaded = ref<boolean>(false);
export const displayAllDatasets = ref<boolean>(false);
export const datasetsOrderFilter = ref<"latestModified" | "newest" | "mostPlayed" | "highestScores">("latestModified");
export const datasets = ref<ComparisonsDataset[]>([]);
export const datasetToCompare = ref<ComparisonsDataset | null>(null);
export const currentDatasetInDetails = ref<ComparisonsDataset>();

watch(openComparsionPanel, () => {
    datasetToCompare.value = null;
});

export const _reset = () => {
    openComparsionPanel.value = false;
    hasDataBeenLoaded.value = false;
    datasetsOrderFilter.value = "latestModified";
    datasets.value = [];
    datasetToCompare.value = null;
};

export default {
    // Properties:
    openComparsionPanel,
    hasDataBeenLoaded,
    datasets,
    datasetsOrderFilter,
    displayAllDatasets,
    datasetToCompare,
    // Methods SYNC:
    // Methods ASYNC:
    loadDatasets,
} as UseComparisons;
