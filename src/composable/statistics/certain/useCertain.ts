import { ref } from "vue";
import useCertain, { WordsProgress } from "@/types/compositions/statistics/_useCertain";
import { DatasetFile } from "@/types/Dataset";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
// import utils
import _loadData from "@/composable/statistics/certain/__utils/loaders/loader";
import _dailyActivity from "@/composable/statistics/certain/__utils/dailyActivity";
import _averagesForChart from "@/composable/statistics/certain/__utils/averagesForChart";
// use utils
export const loadData = _loadData;
export const dailyActivity = _dailyActivity;
export const averagesForChart = _averagesForChart;
//

export const dataset = ref<DatasetFile | null>(null);
export const gamesHistory = ref<ProgressLogFile[]>([]);
export const wordsProgress = ref<WordsProgress>({
    mastered: [],
    common: [],
    strong: [],
    weak: [],
});
export default {
    // Properties:
    dataset,
    gamesHistory,
    dailyActivity,
    wordsProgress,
    // Methods SYNC:
    // averagesForChart,
    // Methods ASYNC:
    loadData,
} as useCertain;
