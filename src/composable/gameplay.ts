import { ref } from "vue";
import WordDraw from "@/types/WordDraw";
import Word from "@/types/Word";
import { LatestAnswerMessage } from "@/types/Gameplay";
import { loadData } from "@/composable/data";
import { resetLog, saveLog } from "@/composable/logger";
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
export const answersResult = ref<LatestAnswerMessage>(null);
export const remainingRedemptionAttemptsNumber = ref<number>(0);
export const latestInvalidWord = ref<Word | null>(null);
// dynamic defined methods
export const resetUsersAnswer = () => _resetUsersAnswer();
export const drawNewWord = () => _drawNewWord();
export const proccessAnswer = () => {
    if (latestInvalidWord.value) return;
    _processAnswer();
};
//
export const startNewGamplay = () => {
    isGameplay.value = true;
    remainingRedemptionAttemptsNumber.value = 0;
    answersResult.value = null;
    resetLog();
    loadData();
    drawNewWord();
    resetUsersAnswer();
};
//
export const endGamplay = () => {
    isGameplay.value = false;
    saveLog();
    resetUsersAnswer();
};
//
//
//
export default { draw, usersAnswer, drawNewWord, proccessAnswer, answersResult, remainingRedemptionAttemptsNumber, isGameplay, startNewGamplay, endGamplay, latestInvalidWord };
