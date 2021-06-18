import { ref } from "vue";
import { GameplayDataFile, GameplayDataFileForPreview } from "@/types/Gameplay";
// load utils
import _gameplaysIconPathResolver from "@/composable/datasets_manager/__utils/gameplaysIconPathResolver";
import {
    loadSingleGameplayFile as _loadSingleGameplayFile, //
    loadGameplayFilesForPreview as _loadGameplayFilesForPreview,
} from "@/composable/datasets_manager/__utils/loaders";
// define ref properties
export const latestLoadedDataFile = ref<GameplayDataFile>({} as GameplayDataFile);
export const dataToPreview = ref<GameplayDataFileForPreview[]>([]);
// use utils
export const gameplaysIconPathResolver = _gameplaysIconPathResolver;
export const loadSingleGameplayFile = async (fileName: string) => (latestLoadedDataFile.value = await _loadSingleGameplayFile(fileName));
export const loadGameplayFilesForPreview = async () => (dataToPreview.value = await _loadGameplayFilesForPreview());
//
//
//
export default { loadSingleGameplayFile, loadGameplayFilesForPreview, dataToPreview, gameplaysIconPathResolver };
