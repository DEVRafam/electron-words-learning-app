<template>
    <div class="displayed group">
        <template v-if="type === 'image'">
            <header>
                <label for="displayed" class="crucial">Displayed: </label>
                <button @click="() => $refs['fileInp'].click()">Change</button>
            </header>
            <div class="img" :style="`background-image: url('${imageURL}')`"></div>
            <input type="file" @change="handleInputChange" id="displayed" ref="fileInp" style="display: none" accept="image/*" />
        </template>
        <!--  -->
        <template v-else>
            <header>
                <label for="displayed" class="crucial">Displayed: </label>
            </header>
            <!--  -->
            <Input v-model.trim="displayed"></Input>
            <!--  -->
        </template>
    </div>
</template>

<script lang="ts">
// Tools
import { defineComponent, ref, watch } from "vue";
// Types
import type FileInputEvent from "@/types/FileInputEvent";
// Composable
import useAddNewWordModal from "./useAddNewWordModal";
// Components
import Input from "./Input.vue";

export default defineComponent({
    components: { Input },
    setup() {
        const { displayed, type, file, imageURL } = useAddNewWordModal;
        const MAX_LENGTH = process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD as unknown as number;
        const fileInp = ref<HTMLInputElement | null>(null);
        //
        const handleInputChange = (e: FileInputEvent) => {
            const f = e.target.files[0];
            if (f) {
                file.value = f;
                const reader = new FileReader();
                reader.onload = () => (imageURL.value = reader.result as string);
                reader.readAsDataURL(f);
            } //
            else {
                imageURL.value = "";
                file.value = null;
            }
        };
        //
        watch(type, (val) => {
            if (val === "image")
                setTimeout(() => {
                    fileInp.value?.click();
                }, 10);
        });
        //
        return { MAX_LENGTH, displayed, type, file, imageURL, handleInputChange, fileInp };
    },
});
</script>
