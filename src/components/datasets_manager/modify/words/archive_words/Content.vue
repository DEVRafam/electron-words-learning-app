<template>
    <section id="archived-words">
        <header>
            <h3>
                <span>Restore deleted words </span>
                <strong>2/3</strong>
            </h3>
            <button>Show selected</button>
        </header>
        <div class="table-wrap">
            <table>
                <thead>
                    <th>ID</th>
                    <th>Expected</th>
                    <th>Displayed</th>
                    <th>Action</th>
                </thead>
                <tr>
                    <td class="center">1</td>
                    <td>seemingly</td>
                    <td>pozornie</td>
                    <td class="center">
                        <button>Restore</button>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    async setup() {
        //
    },
});
</script>
