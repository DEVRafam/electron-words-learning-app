<template>
    <section id="title-description">
        <div class="form-box">
            <header>
                <label for="title">Title</label>
                <ChangesCommunique target="title" @undo="title = datasetToModify.title"></ChangesCommunique>
            </header>
            <input type="text" placeholder="Title..." v-model="title" id="title" :tabindex="tabindex" :maxlength="restrictions.title.max" />
            <LengthNotification target="title"></LengthNotification>
        </div>
        <!--  -->
        <div class="form-box">
            <header>
                <label for="description">Description</label>
                <ChangesCommunique target="description" @undo="description = datasetToModify.description"></ChangesCommunique>
            </header>
            <textarea placeholder="Description..." v-model="description" id="description" :tabindex="tabindex" :maxlength="restrictions.description.max"></textarea>
            <LengthNotification target="description"></LengthNotification>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useModifier from "@/composable/datasets_manager/useModifier";

import LengthNotification from "@/components/datasets_manager/modify/general/landing-panel/LengthNotification.vue";
import ChangesCommunique from "@/components/datasets_manager/modify/general/landing-panel/ChangesCommunique.vue";
//
export default defineComponent({
    components: { LengthNotification, ChangesCommunique },
    setup() {
        const { title, description, iconName, displaySelectIconPanel, restrictions } = useModifier.useGeneralInformations;
        const { datasetToModify } = useModifier;
        const tabindex = computed<1 | -1>(() => {
            return !displaySelectIconPanel.value ? 1 : -1;
        });
        return { title, description, iconName, datasetToModify, tabindex, restrictions };
    },
});
</script>
