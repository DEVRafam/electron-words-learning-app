import { ref } from "vue";
import { GameplayDataFile, GameplayDataFileForPreview } from "@/types/Gameplay";
// load utils
import _gameplaysIconPathResolver from "@/composable/datasets_manager/__utils/gameplaysIconPathResolver";
import _loadAllGameplayFilesForPreview from "@/composable/datasets_loaders/__utils/loadAllGameplayFilesForPreview";
import _loadSingleGameplayFile from "@/composable/datasets_loaders/__utils/loadSingleGameplayFile";
// use utils
export const gameplaysIconPathResolver = _gameplaysIconPathResolver;
export const loadSingleGameplayFile = _loadSingleGameplayFile;
export const loadGameplayFilesForPreview = _loadAllGameplayFilesForPreview;
// properties
export const latestLoadedDataFile = ref<GameplayDataFile>({} as GameplayDataFile);
export const dataToPreview = ref<GameplayDataFileForPreview[]>([]);
//
//
//
export default { loadSingleGameplayFile, loadGameplayFilesForPreview, dataToPreview, gameplaysIconPathResolver };
