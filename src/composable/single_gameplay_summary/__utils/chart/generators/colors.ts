import { chartDataType } from "@/composable/single_gameplay_summary/useChart";

export default (): string[] => {
    if (chartDataType.value === "answers") return ["#ff3838", "#05c46b", "#ff9f1a"];
    else return ["#0fb9b1", "#26de81", "#eb3b5a", "#f7b731", "#3867d6"];
};
