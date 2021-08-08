import { computed, ComputedRef } from "vue";
import { GameplayDataFile } from "@/types/Gameplay";
import { dataToPreview, filter, filterOrder } from "@/composable/datasets_loaders/useDatasetsLoader";

export default (): ComputedRef<GameplayDataFile[]> => {
    return computed(() => {
        let result = dataToPreview.value;
        if (filter.value === "largest") {
            result = dataToPreview.value.sort((a, b) => {
                return b.wordsAmount - a.wordsAmount;
            });
        }
        //
        else if (filter.value === "latestModified") {
            result = dataToPreview.value.sort((a, b) => {
                return b._rawTimes.lastModified - a._rawTimes.lastModified;
            });
        }
        //
        else if (filter.value === "newest") {
            result = dataToPreview.value.sort((a, b) => {
                return b._rawTimes.createdAt - a._rawTimes.createdAt;
            });
        }
        //
        if (filterOrder.value === "ASC") result = result.reverse();

        return result as unknown as GameplayDataFile[];
    });
};
