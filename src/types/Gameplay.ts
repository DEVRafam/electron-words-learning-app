import Word from "@/types/Word";

export type LatestAnswerMessage = "INVALID" | "VALID" | "REDEMPTION" | null;

export interface GameplayDataFile {
    title: string;
    description: string;
    pronunciationLanguage: false | string;
    icon: string;
    words: Word[];
    fancyLetters: string[];
}

export interface GameplayDataFileForPreview extends Omit<GameplayDataFile, "words"> {
    fileName: string;
    wordsAmount: number;
    lastModified: string;
    createdAt: string;
    _rawTimes: {
        lastModified: number;
        createdAt: number;
    };
    _justCreated?: boolean;
}
