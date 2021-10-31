<template>
    <div class="input-wrap">
        <input type="text" :value="modelValue" placeholder="First form" :maxlength="MAX_LENGTH" @input="update" v-bind="$attrs" />
        <strong class="length-notification">{{ `${modelValue.length} / ${MAX_LENGTH}` }}</strong>
        <button @click="() => $emit('update:modelValue', '')" :disabled="!modelValue.length" tabindex="-1">X</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: String as PropType<string>,
            required: true,
        },
    },
    inheritAttrs: false,
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;
        const update = (e: Event) => {
            const { value } = e.target as HTMLInputElement;
            emit("update:modelValue", value);
        };

        return { MAX_LENGTH, update };
    },
});
</script>
