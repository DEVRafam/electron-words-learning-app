import { ref } from "vue";
import { GameplayDataFile } from "@/types/Gameplay";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
import Word from "@/types/Word";
// import utils
import _loadData from "@/composable/statistics/certain/__utils/loaders/loader";
import _dailyActivity from "@/composable/statistics/certain/__utils/dailyActivity";
import _averagesForChart from "@/composable/statistics/certain/__utils/averagesForChart";
// use utils
export const loadData = _loadData;
export const dailyActivity = _dailyActivity;
export const averagesForChart = _averagesForChart;
//
interface WordsProgress {
    weak: Word[];
    mastered: Word[];
    strong: Word[];
    common: Word[];
}
export const dataset = ref<GameplayDataFile | null>(null);
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
    averagesForChart,
    wordsProgress,
    // Methods SYNC:
    //
    // Methods ASYNC:
    loadData,
};
