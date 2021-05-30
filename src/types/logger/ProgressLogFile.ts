import { CrucialWords } from "@/types/logger/CrucialWords";
import { Answers, ProgressPoints } from "@/types/logger/Progress";

export default interface ProgressLogToSave {
    "accuracy[%]": number;
    number_of_draws: number;
    session: {
        date: string;
        "duration[s]": number;
    };
    answers: Answers;
    crucial_words: CrucialWords;
    points: ProgressPoints;
}
