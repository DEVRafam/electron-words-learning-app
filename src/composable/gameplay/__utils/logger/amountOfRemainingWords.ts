import { computed } from "vue";
import { data } from "@/composable/gameplay/useData";

export default computed<number>(() => {
    return data.value.length;
});
