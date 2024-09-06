import { Injectable } from '@nestjs/common';

@Injectable()
export class StringCheckerService {

    isTimeString(timeString: string): boolean {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(timeString);

    }

    isDateString(dateString: string): boolean {

        const regex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
        return regex.test(dateString);

    }

}
