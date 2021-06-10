import { Answers } from "@/types/logger/Progress";
import { CrucialWords } from "@/types/logger/CrucialWords";
import { chartDataType } from "@/composable/single_gameplay_summary/useChart";
import useLoadData from "@/composable/single_gameplay_summary/loadData";

export default (): Answers | CrucialWords => {
    const { data: logFileData } = useLoadData;

    if (chartDataType.value === "answers") return logFileData.value.answers as Answers;
    return logFileData.value.crucial_words as CrucialWords;
};
