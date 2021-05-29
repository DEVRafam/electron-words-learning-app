import { usersAnswer, draw, latestAnswerMessage, remainingRedemptionAttemptsNumber, drawNewWord } from "@/composable/gameplay";
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
        drawNewWord();
    }

    answerIsValidCase() {
        latestAnswerMessage.value = "Correct answer!";
        logValidAnswer(this.expectation);
        this.finishProcessing();
    }

    generateMessageForInvalidAnswer() {
        latestAnswerMessage.value = `Invalid answer! You have still <strong>${remainingRedemptionAttemptsNumber.value}</strong> chances for redemption`;
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
            latestAnswerMessage.value = "Correct answer!";
            logRescuedAnswer(this.expectation);
            remainingRedemptionAttemptsNumber.value = 0;
            return this.finishProcessing();
        }
        //
        else if (remainingRedemptionAttemptsNumber.value === 0) {
            latestAnswerMessage.value = `Unfortunately ;/ The correct answer was <strong>${this.expectation.english}</strong>`;
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
