<template>
    <section id="fancy-letters" class="form-box">
        <label>Fancy letters</label>
        <Preview></Preview>
        <NewLetterForm></NewLetterForm>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewLetterForm from "@/components/datasets_manager/modify/general/fancy-letters/NewLetterForm.vue";
import Preview from "@/components/datasets_manager/modify/general/fancy-letters/Preview.vue";
//
export default defineComponent({
    components: { Preview, NewLetterForm },
});
</script>
