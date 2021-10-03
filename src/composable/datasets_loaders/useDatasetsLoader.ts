import { ref, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
// load utils
import _gameplaysIconPathResolver from "@/composable/datasets_manager/__utils/gameplaysIconPathResolver";
import _loadAllGameplayFilesForPreview from "@/composable/datasets_loaders/__utils/loadAllGameplayFilesForPreview";
import _loadSingleGameplayFile from "@/composable/datasets_loaders/__utils/loadSingleGameplayFile";
import _distinguishGameplaysWithBlockedStatistics from "@/composable/datasets_loaders/__utils/distinguishGameplaysWithBlockedStatistics";
// use utils
export const gameplaysIconPathResolver = _gameplaysIconPathResolver;
export const loadSingleGameplayFile = _loadSingleGameplayFile;
export const loadGameplayFilesForPreview = _loadAllGameplayFilesForPreview;
export const distinguishGameplaysWithBlockedStatistics = _distinguishGameplaysWithBlockedStatistics;
// properties
export const dataToPreview = ref<GameplayDataFileForPreview[]>([]);
export const refreshKey = ref<number>(0); // for views/DatasetsManager.vue only
//
watch(refreshKey, () => {
    dataToPreview.value = [];
});
//
//
//
export default {
    // Properties:
    dataToPreview,
    refreshKey,
    // methods SYNC:
    gameplaysIconPathResolver,
    // methods ASYNC:
    loadSingleGameplayFile,
    loadGameplayFilesForPreview,
    distinguishGameplaysWithBlockedStatistics,
};
