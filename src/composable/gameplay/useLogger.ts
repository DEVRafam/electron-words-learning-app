import { ref } from "vue";

import ProgressLog from "@/types/logger/Progress";
import Word from "@/types/Word";
import UseLogger from "@/types/compositions/gameplay/_useLogger";
// load utils
import _resetLog from "@/composable/gameplay/__utils/logger/resetLog";
import _saveLog from "@/composable/gameplay/__utils/logger/saveLog/saveLog";
import _amountOfRemainingWords from "@/composable/gameplay/__utils/logger/amountOfRemainingWords";
// use utils
export const resetLog = _resetLog;
export const saveLog = _saveLog;
export const amountOfRemainingWords = _amountOfRemainingWords;
//
export const progressLog = ref<ProgressLog>({} as ProgressLog);
//
export const logValidAnswer = (answer: Word) => progressLog.value.answers.valid.push(answer);
export const logInvalidAnswer = (answer: Word) => progressLog.value.answers.invalid.push(answer);
export const logRescuedAnswer = (answer: Word) => progressLog.value.answers.rescued.push(answer);
//
resetLog();
//
//
export default {
    // Properties
    progressLog,
    amountOfRemainingWords,
    // methods SYNC:
    resetLog,
    // methods ASYNC:
    saveLog,
} as UseLogger;
