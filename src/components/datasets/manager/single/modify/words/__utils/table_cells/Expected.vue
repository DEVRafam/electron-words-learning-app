<template>
    <td class="expected" v-if="phraseOccured">
        <span v-html="JSXValue"></span>
        <slot name="default"></slot>
    </td>
    <td class="expected" v-else>
        <span v-text="expected"></span>
        <slot name="default"></slot>
    </td>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType } from "vue";
import mixin from "./expected_and_displayed_mixin";

export default defineComponent({
    props: {
        expected: {
            type: String as PropType<string>,
            required: true,
        },
        target: {
            type: String as PropType<"current" | "archived">,
            required: true,
        },
    },
    setup(props) {
        const { JSXValue, phraseOccured } = mixin(props.target, props.expected);
        return { JSXValue, phraseOccured };
    },
});
</script>
