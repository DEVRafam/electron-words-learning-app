import { Ref, ComputedRef } from "vue";
import Word from "@/types/Word";
import { DatasetFile } from "@/types/Dataset";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export interface WordsProgress {
    weak: Word[];
    mastered: Word[];
    strong: Word[];
    common: Word[];
}

export interface DailyActivity {
    numbers: number[];
    days: string[];
    dates: string[];
}

export default interface UseCertain {
    // Properties:
    dataset: Ref<DatasetFile | null>;
    gamesHistory: Ref<ProgressLogFile[]>;
    dailyActivity: ComputedRef<DailyActivity>;
    wordsProgress: Ref<WordsProgress>;
    // Methods SYNC:
    // Methods ASYNC:
    loadData(): Promise<void>;
}
