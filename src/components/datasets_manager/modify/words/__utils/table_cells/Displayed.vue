<template>
    <td v-html="JSXValue" v-if="phraseOccured"></td>
    <td v-text="displayed" v-else></td>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import mixin from "./expected_and_displayed_mixin";

export default defineComponent({
    props: {
        displayed: {
            type: String as PropType<string>,
            required: true,
        },
        target: {
            type: String as PropType<"current" | "archived">,
            required: true,
        },
    },
    setup(props) {
        const { JSXValue, phraseOccured } = mixin(props.target, props.displayed);
        return { JSXValue, phraseOccured };
    },
});
</script>
