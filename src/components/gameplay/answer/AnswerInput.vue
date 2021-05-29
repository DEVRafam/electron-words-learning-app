<template>
    <div class="input-wrap">
        <input type="text" :id="`answer-input${index}`" :maxlength="lengthLimit" :modelValue="modelValue" @input="(e) => handleInput(e.target.value)" />
        <span>{{ `${modelValue ? modelValue.length : 0}/${lengthLimit}` }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
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
        index: {
            type: Number as PropType<number>,
            default: 0,
        },
    },
    methods: {
        handleInput(val: string) {
            this.$emit("update:modelValue", val);
            // automatically go to next input
            // if (val.length === this.lengthLimit) {
            //     const nextInput: HTMLInputElement | null = document.querySelector(`input#answer-input${this.index + 1}`);
            //     if (nextInput) nextInput.focus();
            // }
        },
    },
});
</script>
