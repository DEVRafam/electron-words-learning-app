<template>
    <section id="summary" class="field">
        <h3 class="field-header">
            <font-awesome-icon icon="clock"></font-awesome-icon>
            <span>Total time: </span>
            <span v-html="totalTime"></span>
        </h3>
        <h3 class="field-header">
            <font-awesome-icon icon="fire"></font-awesome-icon>
            <span>Highest days streak: </span>
            <span class="color">{{ highestDaysStreak }}</span>
        </h3>

        <span class="bg-shapes">
            <span class="bg-shape left-big"></span>
            <span class="bg-shape left-small"></span>
            <span class="bg-shape right-small"></span>
            <span class="bg-shape right-big"></span>
        </span>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import useCertain from "@/composable/statistics/certain/useCertain";

export default defineComponent({
    setup() {
        const { gamesHistory } = useCertain;
        const totalTime = computed<string>(() => {
            const _colored = (word: string) => `<span class='color'>${word}</span>`;

            let result = 0;
            gamesHistory.value.forEach((target) => (result += target.session["duration[s]"]));
            const [minutes, seconds] = `${result / 60}`.split(".");

            return `${_colored(minutes)} min ${_colored(seconds.slice(0, 2))} s`;
        });

        const highestDaysStreak = computed<number>(() => {
            let latestDate = "";
            let highestDaysStreak = 0;
            let currentStreak = 0;

            const streakCondition = (date1: string, date2: string): boolean => {
                const { parse } = Date;
                const _oneDay = 1000 * 60 * 60 * 24;
                const _day = (date: string) => new Date(parse(date)).getDate();
                const thereAreNotFromTheSameDay = _day(date1) !== _day(date2);
                const differenceIsUpTo24h = Math.abs(parse(date1) - parse(date2)) < _oneDay;
                return thereAreNotFromTheSameDay && differenceIsUpTo24h;
            };

            gamesHistory.value.forEach((target) => {
                // First iteration
                if (!latestDate) {
                    highestDaysStreak = 1;
                    currentStreak = 1;
                }
                //
                else {
                    if (streakCondition(latestDate, target.session.date)) {
                        currentStreak += 1;
                        if (currentStreak > highestDaysStreak) highestDaysStreak = currentStreak;
                    } else currentStreak = 1;
                }
                latestDate = target.session.date;
            });

            return highestDaysStreak;
        });

        return { totalTime, highestDaysStreak };
    },
});
</script>
