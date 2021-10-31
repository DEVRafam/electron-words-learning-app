<template>
    <template v-if="word.type !== 'image'">
        <td class="displayed">
            {{ word.displayed }}
        </td>
    </template>
    <!--  -->
    <template v-else>
        <td class="displayed image" :style="`background-image: url(${word.displayed})`"></td>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NewWord } from "@/types/Word";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
    },
});
</script>
