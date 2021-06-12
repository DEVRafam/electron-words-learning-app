<template>
    <div>
        <Suspense>
            <template #default>
                <Main></Main>
            </template>
            <!--  -->
            <template #fallback>
                <h1>Loading...</h1>
            </template>
        </Suspense>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { useRoute } from "vue-router";
import Main from "@/components/gameplay/Main.vue";
//
export default defineComponent({
    components: { Main },
});
</script>
