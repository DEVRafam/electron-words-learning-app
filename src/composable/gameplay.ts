import { ref, computed } from "vue";
import WordDraw from "@/types/WordDraw";
import { loadData } from "@/composable/data";
import { resetLog, saveLog, logInvalidAnswer } from "@/composable/logger";
import computeProgressPoints from "@/composable/__utils/logger/computeProgressPoints"; // 🚀🚀
// load utils
import _drawNewWord from "@/composable/__utils/gameplay/drawRandomWord";
import _processAnswer from "@/composable/__utils/gameplay/processUsersAnswer";
import _resetUsersAnswer from "@/composable/__utils/gameplay/resetUsersAnswer";
//
// create composable module
//
// static defined properites
export const isGameplay = ref<boolean>(false);
export const draw = ref<WordDraw>({} as WordDraw);
export const usersAnswer = ref<string[]>([""]);
export const latestAnswerMessage = ref<string>("");
export const remainingRedemptionAttemptsNumber = ref<number>(0);
// dynamic defined properties
export const isWordDrawed = computed<boolean>(() => !!draw.value.word);
// dynamic defined methods
export const resetUsersAnswer = () => _resetUsersAnswer();
export const drawNewWord = () => _drawNewWord();
export const proccessAnswer = () => _processAnswer();
//
export const startNewGamplay = () => {
    isGameplay.value = true;
    remainingRedemptionAttemptsNumber.value = 0;
    latestAnswerMessage.value = "";
    resetLog();
    loadData();
    drawNewWord();
    resetUsersAnswer();
    console.log(computeProgressPoints()); // 🚀🚀
};
//
export const endGamplay = () => {
    isGameplay.value = false;
    logInvalidAnswer(draw.value.word); // save current draw as invalid answer
    saveLog();
    resetUsersAnswer();
};
//
//
//
export default { draw, usersAnswer, drawNewWord, isWordDrawed, proccessAnswer, latestAnswerMessage, remainingRedemptionAttemptsNumber, isGameplay, startNewGamplay, endGamplay };
