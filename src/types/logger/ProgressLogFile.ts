import { CrucialWords } from "@/types/logger/CrucialWords";
import { Answers, ProgressPoints } from "@/types/logger/Progress";

export default interface ProgressLogFile {
    "accuracy[%]": number;
    number_of_draws: number;
    total_amount_of_words: number;
    icon_name: string;
    session: {
        date: string;
        "duration[s]": number;
    };
    answers: Answers;
    crucial_words: CrucialWords;
    points: ProgressPoints;
}
