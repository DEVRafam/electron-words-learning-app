import { ref, computed } from "vue";
import WordDraw from "@/types/WordDraw";
// load utils
import _drawNewWord from "@/composable/__utils/gameplay/drawRandomWord";
//
// create composable module
//
// static defined properites
export const draw = ref<WordDraw>({} as WordDraw);
export const usersAnswer = ref<string[]>([""]);
export const isWordDrawed = computed<boolean>(() => !!draw.value.word);
// dynamic defined methods
export const drawNewWord = _drawNewWord(draw, usersAnswer);

export default { draw, usersAnswer, drawNewWord, isWordDrawed };
