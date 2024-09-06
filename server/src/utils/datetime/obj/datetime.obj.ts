
import * as moment from "moment";

const dailyMilisseconds = 24 * 60 * 60 * 1000;

export class DateTime {

    constructor(
        public date: moment.Moment
    ) { }

    static findCurrDayRemainingPercentage(): number {

        const currDate = this.now();

        return (currDate.getCopy().setDateToEndOfDay().date.diff(currDate.date, "milliseconds")) / dailyMilisseconds;

    }

    static generateTimeDate(timeString: string, refDate: DateTime): DateTime {
        const times = timeString.split(":");
        const timeDate = refDate.getCopy();
        timeDate.date.set({
            hour: Number(times[0]),
            minutes: Number(times[1]),
            second: Number(times[2])
        });
        return timeDate.getCopy();
    }

    static now(): DateTime {
        return new DateTime(moment());
    }

    static coreStart(companyId: number): DateTime {
        return global.coreStartDate[companyId].getCopy();
    }

    static fromString(dateString: string, pattern?: string): DateTime {
        return new DateTime(moment(dateString, pattern));
    }

    isMidnight() {
        return this.date.hour() === 0
            && this.date.minute() === 0
            && this.date.second() === 0;
    }

    getFullDate() {
        return {
            day: this.date.get("date"),
            month: this.date.get("month"),
            year: this.date.get("year"),
        }
    }

    getWeekDay(): number {
        return this.date.get("day");
    }

    setTimeWithTimeString(timeString: string): DateTime {

        const splittedTime = timeString.split(":").map((timeValue) => parseInt(timeValue));

        this.date.set(
            {
                hour: splittedTime[0],
                minute: splittedTime[1],
                second: splittedTime[2]
            }
        );
        return this.getCopy();

    }

    setTime(hour: number, minute: number, second: number): DateTime {
        this.date.set(
            {
                hour: hour,
                minute: minute,
                second: second
            }
        );
        return this.getCopy();
    }

    setFullDate(day: number, month: number, year: number): DateTime {
        this.date.set(
            {
                date: day,
                month: month,
                year: year
            }
        );
        return this.getCopy();
    }

    setDateForToday(): DateTime {
        const today = DateTime.now();
        this.date.set(
            {
                date: today.date.get("date"),
                month: today.date.get("month"),
                year: today.date.get("year")
            }
        )
        return this.getCopy();
    }

    diffInSeconds(date: DateTime): number {
        return this.date.diff(date.date, "seconds");
    }

    getCopy(): DateTime {
        return new DateTime(moment(this.date));
    }

    convertSecondsToMilliseconds(seconds: number): number {
        return seconds * 1000
    }

    convertDaysToMilliseconds(days: number): number {
        return days * 24 * 3600 * 1000
    }

    addSeconds(seconds: number): DateTime {
        this.date.add(seconds, "seconds");
        return this.getCopy();
    }

    addDays(days: number): DateTime {
        this.date.add(days, "days");
        return this.getCopy();
    }

    isSameTime(date: DateTime): boolean {
        return (
            date.date.get("hour") === this.date.get("hour")
            && date.date.get("minute") === this.date.get("minute")
            && date.date.get("second") === this.date.get("second")
        );
    }

    isSameDate(date: DateTime): boolean {
        return (
            date.date.get("date") === this.date.get("date")
            && date.date.get("month") === this.date.get("month")
            && date.date.get("year") === this.date.get("year")
        );
    }

    isAfter(date: DateTime): boolean {
        return this.date.isAfter(date.date);
    }

    isBefore(date: DateTime): boolean {
        return this.date.isBefore(date.date);
    }

    isSame(date: DateTime): boolean {
        return this.date.isSame(date.date);
    }

    isSameOrAfter(date: DateTime): boolean {
        return this.date.isSameOrAfter(date.date);
    }

    isSameOrBefore(date: DateTime): boolean {
        return this.date.isSameOrBefore(date.date)
    }

    setDate(date: moment.Moment): void {
        this.date = date;
    }

    setDateToStartOfDay(): DateTime {
        this.date = this.date.startOf("day");
        return this.getCopy();
    }

    setDateToEndOfDay(): DateTime {
        this.date = this.date.endOf("day");
        return this.getCopy();
    }

    formatToISOString(keepTimezone?: boolean): string {
        return this.date.toISOString(keepTimezone);
    }

    formatToTimeString(): string {
        return this.date.format('HH:mm');
    }

    formatToDateString(): string {
        return this.getCopy().date.format("YYYYMMDD");
        // return this.getCopy().date.format("DD-MM-YYYY");
    }

    formatToDateTimeString(): string {
        return this.getCopy().date.format("YYYY/MM/DD HH:mm:ss");
    }

    formatToDatabaseDateTimeString(): string {
        return this.getCopy().date.format("YYYYMMDD HH:mm:ss");
    }

}