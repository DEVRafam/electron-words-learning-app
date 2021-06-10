import { chartVisualType } from "@/composable/single_gameplay_summary/useChart";

export default () => {
    return {
        display: chartVisualType.value === "pie",
    };
};
