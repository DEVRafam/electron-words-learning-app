import { Ref } from "vue";
import { DatasetFileForPreview } from "@/types/Dataset";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export interface Progress {
    level: "mastered" | "weak" | "strong" | "NONE";
    percentages: number;
}

export interface ComparisonsDataset extends Omit<DatasetFileForPreview, "_justCreated" | "words"> {
    gamesHistory: ProgressLogFile[];
    progress: Progress;
    averageScore: number;
}

export default interface UseComparisons {
    // Properties:
    openComparsionPanel: Ref<boolean>;
    hasDataBeenLoaded: Ref<boolean>;
    datasetsOrderFilter: Ref<"latestModified" | "newest" | "mostPlayed" | "highestScores">;
    displayAllDatasets: Ref<boolean>;
    datasets: Ref<ComparisonsDataset[]>;
    datasetToCompare: Ref<ComparisonsDataset | null>;
    // Methods SYNC:
    // Methods ASYNC:
    loadDatasets(filename: string): Promise<void>;
}
