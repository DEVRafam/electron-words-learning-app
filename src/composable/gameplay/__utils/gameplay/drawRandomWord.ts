import { data } from "@/composable/gameplay/useData";
import { progressLog } from "@/composable/gameplay/useLogger";
import { usersAnswer, draw, endGamplay } from "@/composable/gameplay/useMain";

export default () => {
    progressLog.value.number_of_draws += 1;
    if (!data.value.length) return endGamplay();

    const index = Math.floor(Math.random() * data.value.length);
    const word = data.value[index]; // get random word
    const characters = word.expected.split(" ").map((item) => item.length); // determine amount of words in the phrase
    draw.value = {
        word,
        characters,
        isPhrase: characters.length > 1,
    };
    usersAnswer.value = [""];
    data.value.splice(index, 1);
};
