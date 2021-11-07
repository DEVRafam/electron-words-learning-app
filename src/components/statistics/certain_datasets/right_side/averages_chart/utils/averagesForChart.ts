import { computed, ComputedRef } from "vue";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export default (gamesHistory: ProgressLogFile[], callback: (word: ProgressLogFile) => number | string): ComputedRef<number[]> => {
    return computed<number[]>(() => {
        return gamesHistory.map((_, index) => {
            let temp = 0;
            for (let i = 0; i <= index; i++) {
                temp += Number(callback(gamesHistory[i]));
            }
            return Math.round(temp / (index + 1));
        });
    });
};
