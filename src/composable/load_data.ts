import fse from "fs-extra";
import Word from "@/types/Word";
//
export const PATH = "./src/data/main.json";
export const data: Word[] = fse.readJSONSync(PATH);
//
export interface RandomWordResponse {
    word: Word;
    characters: number[];
    isPhrase: boolean;
}
export const getRandomWord = (): RandomWordResponse => {
    const word = data[Math.floor(Math.random() * data.length)];
    const characters = word.english.split(" ").map((item) => item.length);
    return {
        word,
        characters,
        isPhrase: characters.length > 1,
    };
};
