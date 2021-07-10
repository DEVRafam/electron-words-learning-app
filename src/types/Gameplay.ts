import Word from "@/types/Word";

export type LatestAnswerMessage = "INVALID" | "VALID" | "REDEMPTION" | null;

export type IconName = "english_flag.png" | "germany_flag.jpg" | "PC.jpg";

export interface GameplayDataFile {
    title: string;
    description: string;
    icon: IconName;
    words: Word[];
    fancyLetters: string[];
}

export interface GameplayDataFileForPreview extends Omit<GameplayDataFile, "words"> {
    fileName: string;
    wordsAmount: number;
    lastModified: string;
}
