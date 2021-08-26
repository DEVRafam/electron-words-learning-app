import { data } from "@/composable/gameplay/data";
import { progressLog } from "@/composable/gameplay/logger";
import { usersAnswer, draw } from "@/composable/gameplay/main";

export default () => {
    progressLog.value.number_of_draws += 1;
    const index = Math.floor(Math.random() * data.length);
    const word = data[index]; // get random word
    const characters = word.expected.split(" ").map((item) => item.length); // determine amount of words in the phrase
    draw.value = {
        word,
        characters,
        isPhrase: characters.length > 1,
    };
    usersAnswer.value = [""];
    data.splice(index, 1);
};
