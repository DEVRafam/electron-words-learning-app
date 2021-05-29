import Word from "@/types/Word";
export default interface RandomWordResponse {
    word: Word;
    characters: number[];
    isPhrase: boolean;
}
