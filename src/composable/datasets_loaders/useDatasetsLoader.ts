import { ref } from "vue";
import { GameplayDataFile, GameplayDataFileForPreview } from "@/types/Gameplay";
// load utils
import _gameplaysIconPathResolver from "@/composable/datasets_manager/__utils/gameplaysIconPathResolver";
import _loadAllGameplayFilesForPreview from "@/composable/datasets_loaders/__utils/loadAllGameplayFilesForPreview";
import _loadSingleGameplayFile from "@/composable/datasets_loaders/__utils/loadSingleGameplayFile";
import _filteredDatasets from "@/composable/datasets_loaders/__utils/datasetsOrderFilter";
// use utils
export const gameplaysIconPathResolver = _gameplaysIconPathResolver;
export const loadSingleGameplayFile = _loadSingleGameplayFile;
export const loadGameplayFilesForPreview = _loadAllGameplayFilesForPreview;
export const filteredDatasets = _filteredDatasets();
// properties
export const latestLoadedDataFile = ref<GameplayDataFile>({} as GameplayDataFile);
export const dataToPreview = ref<GameplayDataFileForPreview[]>([]);
export const filterOrder = ref<"ASC" | "DESC">("DESC");
export const filter = ref<"newest" | "latestModified" | "largest">("latestModified");
//
//
//
export default {
    // Properties:
    latestLoadedDataFile,
    filter,
    filterOrder,
    filteredDatasets,
    dataToPreview,
    // methods SYNC:
    gameplaysIconPathResolver,
    // methods ASYNC:
    loadSingleGameplayFile,
    loadGameplayFilesForPreview,
};
