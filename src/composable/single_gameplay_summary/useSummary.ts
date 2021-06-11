import { ref } from "vue";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
import { loadLogFile as _loadLogFile } from "@/composable/single_gameplay_summary/__utils/loadLogFile";

export const data = ref<ProgressLogFile>({} as ProgressLogFile);
export const loadLogFile = async (name: string): Promise<boolean> => await _loadLogFile(data, name);

export default { data, loadLogFile };
