import { DateTime } from "../../../datetime/obj/datetime.obj";
import { Period } from "../../obj/period.obj"

export const mockPeriod = (startDate: DateTime, endDate: DateTime) => {
    return new Period(
        startDate,
        endDate
    );
}