import { ComputedRef, Ref } from "vue";
import ProgressLog from "@/types/logger/Progress";

export default interface UseLogger {
    // Properties
    progressLog: Ref<ProgressLog>;
    amountOfRemainingWords: ComputedRef<number>;
    // methods SYNC:
    resetLog(): void;
    // methods ASYNC:
    saveLog(): Promise<void>;
}
