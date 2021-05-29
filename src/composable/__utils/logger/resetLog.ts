import { progressLog } from "@/composable/logger";

export default () => {
    progressLog.value = {
        "accuracy[%]": null,
        number_of_draws: 0,
        start: {
            UTC: new Date().toUTCString(),
            raw: Date.now(),
        },
        answers: {
            invalid: [],
            valid: [],
            rescued: [],
        },
    };
};
