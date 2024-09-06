import { DateTime } from "../../datetime.obj"

export const mockDateTime = (date: moment.Moment) => {
    return new DateTime(date);
}

export const mockValidDateStrings = [
    { date: "2022-07-20" },
    { date: "20-07-2022", pattern: "DD-MM-YYYY" },
    { date: "2024-04-11T20:23:32.000Z" }
]

export const mockTimeStrings = [
    "12:00:00",
    "06:00:00",
    "15:35:56",
    "17:45:38"
]