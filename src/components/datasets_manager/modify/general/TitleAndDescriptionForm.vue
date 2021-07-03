<template>
    <section id="title-description">
        <div class="form-box">
            <label for="title">Title</label>
            <input type="text" placeholder="Title..." v-model="title" id="title" />
        </div>
        <!--  -->
        <div class="form-box">
            <label for="description">Description</label>
            <textarea placeholder="Description..." v-model="description" id="description"></textarea>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useGeneralInformations from "@/composable/datasets_manager/useModifier-submodules/useGeneralInformations";
//
export default defineComponent({
    setup() {
        const { title, description, iconName } = useGeneralInformations;
        return { title, description, iconName };
    },
});
</script>
