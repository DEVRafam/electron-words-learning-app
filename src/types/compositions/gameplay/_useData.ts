import { Ref } from "vue";
import Word from "@/types/Word";

export default interface useDate {
    // Properties
    originalData: Ref<Word[]>;
    data: Ref<Word[]>;
    // methods SYNC:
    // methods ASYNC:
    loadData(): Promise<void>;
}
