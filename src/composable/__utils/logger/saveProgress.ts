import fse from "fs-extra";
import { progressLog } from "@/composable/logger";
//
//
export default () => {
    const PATH = `./src/logs/${Date.now()}_log.json`;
    const { answers, start, number_of_draws } = progressLog.value;
    const { invalid, valid, rescued } = answers;
    //
    fse.writeJSONSync(PATH, {
        "accuracy[%]": ((valid.length + rescued.length * 0.75) / (invalid.length + valid.length + rescued.length)).toFixed(2),
        number_of_draws,
        answers,
        session: {
            date: start.UTC,
            "duration[s]": (Date.now() - start.raw) / 1000,
        },
    });
};
