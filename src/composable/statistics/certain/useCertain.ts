import { ref } from "vue";
import { GameplayDataFile } from "@/types/Gameplay";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
// import utils
import _loadData from "@/composable/statistics/certain/__utils/loaders/loader";
// use utils
export const loadData = _loadData;
//
export const dataset = ref<GameplayDataFile | null>(null);
export const gamesHistory = ref<ProgressLogFile[]>([]);
export default {
    // Properties:
    dataset,
    gamesHistory,
    // Methods SYNC:
    //
    // Methods ASYNC:
    loadData,
};
