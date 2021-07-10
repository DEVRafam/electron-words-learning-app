<template>
    <section id="title-description">
        <div class="form-box">
            <header>
                <label for="title">Title</label>
                <span class="changes-communique" :class="{ active: title !== datasetToModify.title }">Changed</span>
            </header>
            <input type="text" placeholder="Title..." v-model="title" id="title" />
        </div>
        <!--  -->
        <div class="form-box">
            <header>
                <label for="description">Description</label>
                <span class="changes-communique" :class="{ active: description !== datasetToModify.description }">Changed</span>
            </header>
            <textarea placeholder="Description..." v-model="description" id="description"></textarea>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";
//
export default defineComponent({
    setup() {
        const { title, description, iconName } = useModifier.useGeneralInformations;
        const { datasetToModify } = useModifier;
        return { title, description, iconName, datasetToModify };
    },
});
</script>
