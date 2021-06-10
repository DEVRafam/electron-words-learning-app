import { chartDataType } from "@/composable/single_gameplay_summary/useChart";

export default (): string[] => {
    if (chartDataType.value === "answers") return ["#ff3838", "#05c46b", "#ff9f1a"];
    else return ["#000000", "#000000", "#000000", "#000000", "#000000"];
};
