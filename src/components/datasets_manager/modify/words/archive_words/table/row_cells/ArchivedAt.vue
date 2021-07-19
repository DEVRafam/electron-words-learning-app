<template>
    <td class="center archivedAt" v-html="betterArchivedAt"></td>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ArchivedWord } from "@/types/Word";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<ArchivedWord>,
            required: true,
        },
    },
    setup(props) {
        const betterArchivedAt = computed<string>(() => {
            const [date, time] = props.word.archivedAt.split(",");
            return `<span>${date}</span><strong>${time}</strong>`;
        });
        return { betterArchivedAt };
    },
});
</script>
