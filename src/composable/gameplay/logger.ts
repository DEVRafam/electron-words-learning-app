import { ref, computed } from "vue";
import router from "@/router/index";
import ProgressLog from "@/types/logger/Progress";
import Word from "@/types/Word";
import { gameplayDataFileName } from "@/composable/gameplay/main";
import _saveProgress from "@/composable/gameplay/__utils/logger/saveProgress";
import _resetLog from "@/composable/gameplay/__utils/logger/resetLog";
import ensureFilesExist from "./__utils/logger/ensureFilesExist";
//
export const progressLog = ref<ProgressLog>({} as ProgressLog);
export const numberOfDraw = computed<number>(() => progressLog.value.number_of_draws);
//
export const logValidAnswer = (answer: Word) => progressLog.value.answers.valid.push(answer);
export const logInvalidAnswer = (answer: Word) => progressLog.value.answers.invalid.push(answer);
export const logRescuedAnswer = (answer: Word) => progressLog.value.answers.rescued.push(answer);
//
_resetLog();
export const resetLog = _resetLog;
export const saveLog = async () => {
    if (progressLog.value.number_of_draws > 1) {
        await ensureFilesExist();
        const logFilename = await _saveProgress();
        resetLog();
        return router.push({ path: `/single-gameplay-summary/${gameplayDataFileName.value}/${logFilename}` });
    } else {
        resetLog();
        router.push({ path: "/" });
    }
};
//
//
export default { progressLog, numberOfDraw, saveLog };
