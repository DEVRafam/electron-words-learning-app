import { ref } from "vue";
import WordDraw from "@/types/WordDraw";
import Word from "@/types/Word";
import { GameplayDataFileForPreview, LatestAnswerMessage } from "@/types/Gameplay";
import { loadData } from "@/composable/gameplay/data";
import { resetLog, saveLog } from "@/composable/gameplay/logger";
// load utils
import _drawNewWord from "@/composable/gameplay/__utils/gameplay/drawRandomWord";
import _processAnswer from "@/composable/gameplay/__utils/gameplay/processUsersAnswer";
import _resetUsersAnswer from "@/composable/gameplay/__utils/gameplay/resetUsersAnswer";
//
// create composable module
//
// static defined properites
export const draw = ref<WordDraw>({} as WordDraw);
export const usersAnswer = ref<string[]>([""]);
export const answersResult = ref<LatestAnswerMessage>(null);
export const remainingRedemptionAttemptsNumber = ref<number>(0);
export const latestInvalidWord = ref<Word | null>(null);
export const gameplayDataFile = ref<GameplayDataFileForPreview>({} as GameplayDataFileForPreview);
// dynamic defined methods
export const resetUsersAnswer = () => _resetUsersAnswer();
export const drawNewWord = () => _drawNewWord();
export const proccessAnswer = () => {
    if (latestInvalidWord.value) return;
    _processAnswer();
};
//
export const startNewGamplay = async () => {
    remainingRedemptionAttemptsNumber.value = 0;
    answersResult.value = null;
    resetLog();
    await loadData();
    drawNewWord();
    resetUsersAnswer();
};
//
export const endGamplay = async () => {
    await saveLog();
    resetUsersAnswer();
};
//
//
//
export default { draw, usersAnswer, drawNewWord, proccessAnswer, answersResult, remainingRedemptionAttemptsNumber, startNewGamplay, endGamplay, latestInvalidWord, gameplayDataFile };
