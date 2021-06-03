<template>
    <div class="single-input">
        <input type="text" :maxlength="lengthLimit" :modelValue="modelValue" @input="(e) => handleInput(e.target.value)" ref="input" :style="inputWidth" :disabled="latestInvalidWord" />
        <span class="length">{{ `${modelValue ? modelValue.length : 0}/${lengthLimit}` }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import useGameplay from "@/composable/gameplay";
//
export default defineComponent({
    props: {
        lengthLimit: {
            type: Number as PropType<number>,
            required: true,
        },
        modelValue: {
            type: String as PropType<string>,
            default: "",
        },
        focus: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    methods: {
        handleInput(val: string) {
            this.$emit("update:modelValue", val);
        },
    },
    mounted() {
        if (this.focus) (this.$refs.input as HTMLInputElement).focus();
    },
    setup(props) {
        const { latestInvalidWord } = useGameplay;
        const inputWidth = `width: ${props.lengthLimit * 30}px`;
        return { inputWidth, latestInvalidWord };
    },
});
</script>
