import { usersAnswer, draw, answersResult, remainingRedemptionAttemptsNumber, drawNewWord, latestInvalidWord } from "@/composable/gameplay";
import { logValidAnswer, logInvalidAnswer, logRescuedAnswer } from "@/composable/logger";
import { removeFromDate } from "@/composable/data";
import Word from "@/types/Word";

class ProcessAnswer {
    result: boolean;
    isRedemption: boolean;
    expectation: Word;

    constructor() {
        this.expectation = draw.value.word;
        this.isRedemption = !!remainingRedemptionAttemptsNumber.value;

        const converted_answer = usersAnswer.value.join(" ").toLowerCase();
        const converted_expectation = this.expectation.english.toLowerCase();
        this.result = converted_answer === converted_expectation;
    }

    finishProcessing() {
        removeFromDate(this.expectation);
        if (answersResult.value == "INVALID") latestInvalidWord.value = draw.value.word;
        else drawNewWord();
    }

    answerIsValidCase() {
        answersResult.value = "VALID";
        logValidAnswer(this.expectation);
        this.finishProcessing();
    }

    generateMessageForInvalidAnswer() {
        answersResult.value = "REDEMPTION";
    }

    resetRedemptionAttemptsAmount() {
        const numberOfAttempts = process.env.VUE_APP_AMOUNT_OF_REDEMPTION_ATTEMPTS as unknown as number;
        remainingRedemptionAttemptsNumber.value = numberOfAttempts;
    }

    anwerIsNotValidCase() {
        const numberOfAttempts = process.env.VUE_APP_AMOUNT_OF_REDEMPTION_ATTEMPTS as unknown as number;
        remainingRedemptionAttemptsNumber.value = numberOfAttempts;
        this.generateMessageForInvalidAnswer();
    }

    handleRedemptionAttempt() {
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

    main() {
        if (!this.isRedemption) {
            if (this.result) this.answerIsValidCase();
            else this.anwerIsNotValidCase();
        } else this.handleRedemptionAttempt();
    }
}

export default () => new ProcessAnswer().main();
