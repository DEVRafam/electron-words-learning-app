import { Ref } from "vue";
import WordDraw from "@/types/WordDraw";
import Word from "@/types/Word";
import { GameplayDataFileForPreview, LatestAnswerMessage } from "@/types/Gameplay";

export default interface UseMain {
    // Properties
    draw: Ref<WordDraw>;
    usersAnswer: Ref<string[]>;
    answersResult: Ref<LatestAnswerMessage>;
    remainingRedemptionAttemptsNumber: Ref<number>;
    latestInvalidWord: Ref<Word | null>;
    gameplayDataFile: Ref<GameplayDataFileForPreview>;
    // methods SYNC:
    drawNewWord(): void;
    proccessAnswer(): void;
    // methods ASYNC:
    startNewGamplay(): Promise<void>;
    endGamplay(): Promise<void>;
}
