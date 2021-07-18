import { ref, Ref } from "vue";

interface SingleTableFilter {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "weak" | "strong" | "mastered">;
}
interface TableFilters {
    current: SingleTableFilter;
    archived: SingleTableFilter;
}

export default {
    current: {
        onlySelected: ref(false),
        progress: ref("all"),
    },
    archived: {
        onlySelected: ref(false),
        progress: ref("all"),
    },
} as TableFilters;
