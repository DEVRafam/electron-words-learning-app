import Word from "@/types/Word";

export type LatestAnswerMessage = "INVALID" | "VALID" | "REDEMPTION" | null;

export interface DatasetFile {
    title: string;
    description: string;
    pronunciationLanguage: false | string;
    icon: string;
    words: Word[];
    fancyLetters: string[];
}

export type ImportedDataset = Omit<DatasetFile, "icon">;

export interface DatasetFileForPreview extends DatasetFile {
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
