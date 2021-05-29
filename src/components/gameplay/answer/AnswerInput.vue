<template>
    <div class="input-wrap">
        <input type="text" :maxlength="lengthLimit" :modelValue="modelValue" @input="(e) => handleInput(e.target.value)" ref="input" />
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
});
</script>
