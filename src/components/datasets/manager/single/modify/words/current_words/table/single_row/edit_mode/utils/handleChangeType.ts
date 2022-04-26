import { Ref } from "vue";
import CurrentWord from "@/classes/CurrentWord";

export default (word: CurrentWord, fileInp: Ref<HTMLInputElement | null>) => {
    return (e: InputEvent) => {
        const { value } = e.target as HTMLSelectElement;
        word._image = null;

        if (value === "image") {
            setTimeout(() => {
                (fileInp.value as HTMLInputElement).click();
            }, 10);
        }
        if (value === word.type) {
            word.modifications.displayed = word.displayed;
            word.modifications.expected = word.expected;
        } //
        else if (value === "image") {
            word.modifications.displayed = "";
        } //
        else if (value === "irregular") {
            word.modifications.displayed = word.displayed;
        }
    };
};
