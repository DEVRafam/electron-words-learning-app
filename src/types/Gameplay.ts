import Word from "@/types/Word";

export type LatestAnswerMessage = "INVALID" | "VALID" | "REDEMPTION" | null;

export interface GameplayDataFile {
    title: string;
    description: string;
    icon: string;
    words: Word[];
    fancyLetters: string[];
}

export interface GameplayDataFileForPreview extends Omit<GameplayDataFile, "words"> {
    fileName: string;
    wordsAmount: number;
    lastModified: string;
}
