import { computed, ComputedRef } from "vue";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export default (callback: (word: ProgressLogFile) => number | string): ComputedRef<number[]> => {
    return computed<number[]>(() => {
        return gamesHistory.value.map((_, index) => {
            let temp = 0;
            for (let i = 0; i <= index; i++) {
                temp += Number(callback(gamesHistory.value[i]));
            }
            return Math.round(temp / (index + 1));
        });
    });
};
