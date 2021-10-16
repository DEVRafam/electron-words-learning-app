import router from "@/router/index";
import { gameplayDataFile } from "@/composable/gameplay/useMain";
import { resetLog, progressLog } from "@/composable/gameplay/useLogger";
// utils
import ensureFilesExist from "@/composable/gameplay/__utils/logger/saveLog/__utils/ensureFilesExist";
import saveProgress from "@/composable/gameplay/__utils/logger/saveLog/__utils/saveProgress";

export default async () => {
    if (progressLog.value.number_of_draws > 1) {
        await ensureFilesExist();
        const logFilename = await saveProgress();
        resetLog();
        router.push({ path: `/single-gameplay-summary/${gameplayDataFile.value.fileName}/${logFilename}` });
    } else {
        resetLog();
        router.push({ path: "/" });
    }
};
