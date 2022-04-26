import { ref, Ref, computed } from "vue";
import { WordType } from "@/types/Word";
import { newWords } from "@/composable/datasets_manager/submodules/useWordsManager";

export const expected = ref<string>("");
export const displayed = ref<string>("");
export const imageURL = ref<string>("");
export const file = ref<File | null>(null);
export const irregulars: Ref<string>[] = [ref<string>("spit"), ref<string>("spat"), ref<string>("spat")];
export const type = ref<WordType>("pair");
const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;

export const reset = () => {
    expected.value = "";
    displayed.value = "";
    imageURL.value = "";
    file.value = null;
    irregulars.forEach((target) => (target.value = ""));
};

export const blockAddButton = computed<boolean>(() => {
    const _validateLength = (subject: string) => subject.length <= MAX_LENGTH && subject.length >= 3;
    if (type.value === "pair") {
        return !_validateLength(expected.value) || !_validateLength(displayed.value);
    }
    //
    else if (type.value === "image") {
        const thereIsNoSelectedImage = (file.value as File) === null;
        const invalidFileExtension = !thereIsNoSelectedImage && (file.value as File)?.type.slice(0, 6) !== "image/";
        const expectedIsInvalid = !_validateLength(expected.value);

        return thereIsNoSelectedImage || invalidFileExtension || expectedIsInvalid;
    }
    //
    else if (type.value === "irregular") {
        return !_validateLength(irregulars[0].value) || !_validateLength(irregulars[1].value) || !_validateLength(irregulars[2].value) || !_validateLength(displayed.value);
    }
    return false;
});

export const addWord = () => {
    if (blockAddButton.value) return;
    newWords.value.push({
        expected: type.value === "irregular" ? JSON.stringify(irregulars.map((target) => target.value)) : expected.value,
        displayed: type.value === "image" ? imageURL.value : displayed.value,
        type: type.value,
        condition: "positive",
        _image: file.value,
        origin: "Inscribed",
    });
    reset();
    (document.getElementById("add-word-first-input") as HTMLInputElement).focus();
};

export default {
    // Properties
    expected,
    displayed,
    irregulars,
    type,
    file,
    imageURL,
    blockAddButton,
    // SYNC methods
    addWord,
    reset,
};
