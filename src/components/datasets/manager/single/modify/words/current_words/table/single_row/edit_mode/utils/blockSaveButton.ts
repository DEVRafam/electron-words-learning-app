import { computed, ComputedRef, Ref } from "vue";
import CurrentWord from "@/classes/CurrentWord";

const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;

export default (word: CurrentWord, irregular1: Ref<string>, irregular2: Ref<string>, irregular3: Ref<string>): ComputedRef<boolean> => {
    return computed<boolean>(() => {
        {
            const _validateLength = (subject: string) => subject.length <= MAX_LENGTH && subject.length >= 3;
            if (word.modifications.type === "pair") {
                //
                const expectedIsInvalid = !_validateLength(word.modifications.expected);
                const displayedIsInvalid = !_validateLength(word.modifications.displayed);
                const displayedHasBeenChanged = word.displayed !== word.modifications.displayed;
                const expectedHasBeenChanged = word.expected !== word.modifications.expected;

                return (!displayedHasBeenChanged && !expectedHasBeenChanged) || expectedIsInvalid || displayedIsInvalid;
            }
            //
            else if (word.modifications.type === "image") {
                const thereIsNoSelectedImage = word._image === null;
                const invalidFileExtension = !thereIsNoSelectedImage && word._image?.type.slice(0, 6) !== "image/";
                const expectedHasnotBeenChanged = word.expected === word.modifications.expected;
                const expectedIsInvalid = !_validateLength(word.modifications.expected);

                return (thereIsNoSelectedImage && invalidFileExtension && expectedHasnotBeenChanged) || expectedIsInvalid || (thereIsNoSelectedImage && word.wasOriginallyAnImage());
            }
            //
            else if (word.modifications.type === "irregular") {
                return !_validateLength(irregular1.value) || !_validateLength(irregular2.value) || !_validateLength(irregular3.value);
            }
            return false;
        }
    });
};
