import { gamesHistory } from "@/composable/statistics/certain/useCertain";
import { computed } from "vue";
import { DailyActivity as _DailyActivity } from "@/types/compositions/statistics/_useCertain";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface DailyActivity {
    Sunday: number;
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
}

const _fewDaysAgoDate = (n: number): string => {
    const _addZero = (word: unknown) => {
        return String(word).length === 1 ? `0${word}` : word;
    };

    const today = Date.now();
    const amountOfDays = n * 1000 * 60 * 60 * 24;
    const date = new Date(today - amountOfDays);

    const days = _addZero(date.getDate());
    const months = _addZero(date.getMonth() + 1);

    return `${days}-${months}`;
};

export default computed<_DailyActivity>(() => {
    const activity: DailyActivity = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
    };
    gamesHistory.value.forEach((gameplay) => {
        const gameplaysRawTime = Date.parse(gameplay.session.date);
        const timeDifference = Date.now() - gameplaysRawTime;
        const oneDay = 1000 * 60 * 60 * 24;
        if (Math.round(timeDifference / oneDay) < 7) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            activity[days[new Date(gameplaysRawTime).getDay()] as keyof DailyActivity] += 1;
        }
    });
    const today = days[new Date().getDay()];
    const indexOfToday = days.indexOf(today);

    return {
        numbers: [
            activity[days[indexOfToday + 1] as keyof DailyActivity],
            activity[days[indexOfToday + 2] as keyof DailyActivity],
            activity[days[indexOfToday + 3] as keyof DailyActivity],
            activity[days[indexOfToday + 4] as keyof DailyActivity],
            activity[days[indexOfToday + 5] as keyof DailyActivity],
            activity[days[indexOfToday + 6] as keyof DailyActivity],
            activity[today as keyof DailyActivity], //
        ],
        days: [
            days[indexOfToday + 1],
            days[indexOfToday + 2],
            days[indexOfToday + 3],
            days[indexOfToday + 4],
            days[indexOfToday + 5],
            days[indexOfToday + 6],
            "Today", //
        ],
        dates: [
            _fewDaysAgoDate(6), //
            _fewDaysAgoDate(5),
            _fewDaysAgoDate(4),
            _fewDaysAgoDate(3),
            _fewDaysAgoDate(2),
            _fewDaysAgoDate(1),
            "Today",
        ],
    };
});
