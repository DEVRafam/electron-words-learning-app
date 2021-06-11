import { ref, watch, computed } from "vue";
import { WordsDivisionCategories } from "@/types/Word";
import Word from "@/types/Word";
import { data } from "@/composable/single_gameplay_summary/useSummary";

export const emphasizeSectionDisplay = ref<boolean>(false);
export const emphasizedWordsCategory = ref<WordsDivisionCategories | null>(null);
export const emphasizedWordsList = ref<null | Word[]>(null);

watch(emphasizedWordsCategory, () => {
    if (emphasizedWordsCategory.value == null) return;
    document.getElementById("emphasized-words")?.scroll(0, 0);
    if (["invalid", "rescued", "valid"].includes(emphasizedWordsCategory.value)) {
        return (emphasizedWordsList.value = (data.value.answers as any)[emphasizedWordsCategory.value]);
    }
    return (emphasizedWordsList.value = (data.value.crucial_words as any)[emphasizedWordsCategory.value]);
});

export const setEmphasize = (category: WordsDivisionCategories | null) => {
    if (emphasizeSectionDisplay.value && category === emphasizedWordsCategory.value) return (emphasizeSectionDisplay.value = false);
    emphasizedWordsCategory.value = category;
    emphasizeSectionDisplay.value = true;
};

export const emphasizeOnCSSClassWrapper = computed<null | "emphasize-on">(() => {
    return emphasizeSectionDisplay.value ? "emphasize-on" : null;
});

export const emphasizeOnCSSClassButton = (buttonID: WordsDivisionCategories): "active" | null => {
    return emphasizeSectionDisplay.value && buttonID === emphasizedWordsCategory.value ? "active" : null;
};
