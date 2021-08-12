<template>
    <td class="expected">
        <input type="text" v-model="word.modifications.expected" :maxlength="MAX_LENGTH" />
    </td>
    <td class="displayed">
        <input type="text" v-model="word.modifications.displayed" :maxlength="MAX_LENGTH" />
    </td>
    <slot name="default"></slot>
    <td class="center actions">
        <button @click="save" class="save" :disabled="blockSaveButton">Save</button>
        <button @click="discard" class="discard">Discard</button>
    </td>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import CurrentWord from "@/classes/CurrentWord";

export default defineComponent({
    emits: ["exit-edit-mode"],
    props: {
        word: {
            type: Object as PropType<CurrentWord>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;
        const save = () => {
            props.word.expected = props.word.modifications.expected;
            props.word.displayed = props.word.modifications.displayed;
            emit("exit-edit-mode");
        };
        const discard = () => {
            props.word.modifications.expected = props.word.expected;
            props.word.modifications.displayed = props.word.displayed;
            emit("exit-edit-mode");
        };
        const blockSaveButton = computed<boolean>(() => {
            const validateLength = (subject: string) => subject.length <= MAX_LENGTH && subject.length >= 3;
            const displayedHasBeenChanged = props.word.displayed !== props.word.modifications.displayed;
            const expectedHasBeenChanged = props.word.expected !== props.word.modifications.expected;
            const expectedIsInvalid = !validateLength(props.word.modifications.expected);
            const displayedIsInvalid = !validateLength(props.word.modifications.displayed);

            return (!displayedHasBeenChanged && !expectedHasBeenChanged) || expectedIsInvalid || displayedIsInvalid;
        });

        return { save, discard, blockSaveButton, MAX_LENGTH };
    },
});
</script>
