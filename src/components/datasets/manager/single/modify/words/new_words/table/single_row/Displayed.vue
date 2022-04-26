<template>
    <template v-if="word.type !== 'image'">
        <td class="displayed">
            {{ word.displayed }}
        </td>
    </template>
    <!--  -->
    <template v-else>
        <td class="displayed image" :style="`background-image: url(${word.displayed})`">
            <div class="button-wrap">
                <button tabindex="-1" @click="() => (openModal = true)"><font-awesome-icon icon="eye"></font-awesome-icon></button>
            </div>
        </td>
        <PreviewImage v-if="openModal" :imageURL="word.displayed" @exit="() => (openModal = false)"></PreviewImage>
    </template>
</template>

<script lang="ts">
// Tools
import { defineComponent, PropType, ref } from "vue";
// Types
import type { NewWord } from "@/types/Word";
// Components
import PreviewImage from "@/components/datasets/manager/single/modify/words/__utils/PreviewImage.vue";

export default defineComponent({
    props: {
        word: {
            type: Object as PropType<NewWord>,
            required: true,
        },
    },
    components: { PreviewImage },
    setup() {
        const openModal = ref<boolean>(false);
        return { openModal };
    },
});
</script>
