import { data } from "@/composable/data";
import { progressLog } from "@/composable/logger";
import { usersAnswer, draw } from "@/composable/gameplay";

export default () => {
    progressLog.value.number_of_draws += 1;
    const word = data[Math.floor(Math.random() * data.length)]; // get random word
    const characters = word.english.split(" ").map((item) => item.length); // determine amount of words in the phrase
    draw.value = {
        word,
        characters,
        isPhrase: characters.length > 1,
    };
    usersAnswer.value = [""];
};
