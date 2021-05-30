import { ref, computed } from "vue";
import ProgressLog from "@/types/logger/Progress";
import Word from "@/types/Word";
import _saveProgress from "@/composable/__utils/logger/saveProgress";
import _resetLog from "@/composable/__utils/logger/resetLog";
//
export const progressLog = ref<ProgressLog>({} as ProgressLog);
export const numberOfDraw = computed<number>(() => progressLog.value.number_of_draws);
//
export const logValidAnswer = (answer: Word) => progressLog.value.answers.valid.push(answer);
export const logInvalidAnswer = (answer: Word) => progressLog.value.answers.invalid.push(answer);
export const logRescuedAnswer = (answer: Word) => progressLog.value.answers.rescued.push(answer);
//
export const resetLog = _resetLog;
export const saveLog = () => {
    _saveProgress();
    resetLog();
};
//
//
export default { progressLog, numberOfDraw, saveLog };
