import { computed, ComputedRef } from "vue";
import useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";

interface MixinResult {
    JSXValue: ComputedRef<string>;
    phraseOccured: ComputedRef<boolean>;
}

export default (target: "current" | "archived", value: string): MixinResult => {
    const { searchingPhrase } = useWordsManager.tableFilters[target];

    return {
        JSXValue: computed<string>(() => {
            const space = String.fromCharCode(160);
            const searching = searchingPhrase.value.replaceAll(" ", space);

            const strongTag = `<strong class='emphasize'>${searching}</strong>`;
            return value.replaceAll(" ", space).replaceAll(searching, strongTag);
        }),
        phraseOccured: computed<boolean>(() => {
            return searchingPhrase.value.length > 0 && value.includes(searchingPhrase.value);
        }),
    };
};
