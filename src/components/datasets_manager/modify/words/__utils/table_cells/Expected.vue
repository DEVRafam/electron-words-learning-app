<template>
    <td class="expected" v-html="JSXValue" v-if="phraseOccured"></td>
    <td class="expected" v-text="expected" v-else></td>
</template>

<script lang="ts">
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
