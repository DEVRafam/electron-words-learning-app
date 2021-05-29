import { Ref } from "vue";
import { data } from "@/composable/data";
import WordDraw from "@/types/WordDraw";

export default (savedWord: Ref<WordDraw>, usersAnswer: Ref<string[]>) => {
    return () => {
        const word = data[Math.floor(Math.random() * data.length)]; // get random word
        const characters = word.english.split(" ").map((item) => item.length); // determine amount of words in the phrase
        savedWord.value = {
            word,
            characters,
            isPhrase: characters.length > 1,
        };
        usersAnswer.value = [""];
    };
};
