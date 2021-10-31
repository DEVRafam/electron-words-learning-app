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
import { defineComponent, PropType, ref } from "vue";
import { NewWord } from "@/types/Word";
import PreviewImage from "@/components/datasets_manager/modify/words/__utils/PreviewImage.vue";

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
