<template>
    <teleport to="section#modals-wrapper">
        <div
            v-bind="$attrs"
            class="modal"
            :class="{
                outro: isModalClosing, //
                intro: !isModalClosing,
                lightBackground: backgroundTheme === 'light',
            }"
        >
            <!--  -->
            <!--  -->
            <!--  -->
            <div class="content">
                <button @click="closeModal" class="close-modal" :tabindex="removeTabindexFromClosing ? -1 : 1">Close</button>
                <slot name="default"></slot>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import useKeydown from "@/composable/useKeydown";

export default defineComponent({
    props: {
        backgroundTheme: {
            type: String as PropType<"light" | "dark">,
            default: "dark",
        },
        removeTabindexFromClosing: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
    },
    emits: ["close-modal"],
    inheritAttrs: false,
    setup(props, { emit }) {
        const isModalClosing = ref<boolean>(false);
        const closeModal = () => {
            isModalClosing.value = true;
            setTimeout(() => emit("close-modal"), 500);
        };

        useKeydown([
            {
                key: "Escape",
                fn: closeModal,
            },
        ]);
        return { closeModal, isModalClosing };
    },
});
</script>
