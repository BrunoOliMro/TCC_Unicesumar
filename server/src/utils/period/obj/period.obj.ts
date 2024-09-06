import { DateTime } from "../../datetime/obj/datetime.obj";

export class Period {

    constructor(
        public start: DateTime,
        public end: DateTime
    ) { }

    setPeriodForToday() {
        this.start.setDateForToday();
        this.end.setDateForToday();
    };

    setEndDate(date: DateTime): void {
        this.start = date;
    }

    findPeriodTimeInSeconds(): number {
        return this.end.diffInSeconds(this.start)
    }

}