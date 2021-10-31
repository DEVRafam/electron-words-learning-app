import { usersAnswer, draw, answersResult, remainingRedemptionAttemptsNumber, drawNewWord, latestInvalidWord } from "@/composable/gameplay/useMain";
import { logValidAnswer, logInvalidAnswer, logRescuedAnswer } from "@/composable/gameplay/useLogger";
import Word from "@/types/Word";

class ProcessAnswer {
    protected result: boolean;
    protected isRedemption: boolean;
    protected expectation: Word;

    public constructor() {
        this.expectation = draw.value.word;
        this.isRedemption = !!remainingRedemptionAttemptsNumber.value;

        const converted_answer = usersAnswer.value.join(" ").toLowerCase();
        const converted_expectation = draw.value.word.type === "irregular" ? JSON.parse(this.expectation.expected).join(" ") : this.expectation.expected.toLowerCase();
        this.result = converted_answer === converted_expectation;
    }

    protected finishProcessing() {
        if (answersResult.value == "INVALID") latestInvalidWord.value = draw.value.word;
        else drawNewWord();
    }

    protected answerIsValidCase() {
        answersResult.value = "VALID";
        logValidAnswer(this.expectation);
        this.finishProcessing();
    }

    protected generateMessageForInvalidAnswer() {
        answersResult.value = "REDEMPTION";
    }

    protected resetRedemptionAttemptsAmount() {
        const numberOfAttempts = process.env.VUE_APP_AMOUNT_OF_REDEMPTION_ATTEMPTS as unknown as number;
        remainingRedemptionAttemptsNumber.value = numberOfAttempts;
    }

    protected anwerIsNotValidCase() {
        const numberOfAttempts = process.env.VUE_APP_AMOUNT_OF_REDEMPTION_ATTEMPTS as unknown as number;
        remainingRedemptionAttemptsNumber.value = numberOfAttempts;
        this.generateMessageForInvalidAnswer();
    }

    protected handleRedemptionAttempt() {
        remainingRedemptionAttemptsNumber.value -= 1;
        //
        if (this.result) {
            answersResult.value = "VALID";
            logRescuedAnswer(this.expectation);
            remainingRedemptionAttemptsNumber.value = 0;
            return this.finishProcessing();
        }
        //
        else if (remainingRedemptionAttemptsNumber.value === 0) {
            answersResult.value = "INVALID";
            logInvalidAnswer(this.expectation);
            return this.finishProcessing();
        } else this.generateMessageForInvalidAnswer();
    }

    public main() {
        if (latestInvalidWord.value) return;

        if (!this.isRedemption) {
            if (this.result) this.answerIsValidCase();
            else this.anwerIsNotValidCase();
        } else this.handleRedemptionAttempt();
    }
}

export default () => new ProcessAnswer().main();
