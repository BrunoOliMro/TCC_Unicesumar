export class Datetime {

    static formatDatetimeString(datetimeString: string): string {

        const splittedDatetime = datetimeString.split("T");
        const splittedTime = splittedDatetime[1].split(".");

        return `${splittedDatetime[0].split("-").reverse().join("/")} ${splittedTime[0]}`

    }

    static convertDatabaseDateToAppDate(dateString: string): string {
        return `${dateString.substring(6, 8)}/${dateString.substring(4, 6)}/${dateString.substring(0, 4)}`;
    }

    static createDatetimeString(date: string, time: string) {
        return `${date.substring(6, 8)}/${date.substring(4, 6)}/${date.substring(0, 4)} ${time}`
    }

    static convertGMTDateToAppDate(date: string) {
        const splittedDate = date.split("-");
        return `${splittedDate[0]}${splittedDate[1]}${splittedDate[2]}`;
    }

    static convertDatabaseDatetimeStringToAppDatetime(date: string) {
        const splittedDatetime = date.split(" ");
        const dateString = splittedDatetime[0];
        return `${dateString.substring(6, 8)}/${dateString.substring(4, 6)}/${dateString.substring(0, 4)} ${splittedDatetime[1]}`;
    }

    static isAfterStringDates(mainDateString: string, compareDateString: string): boolean {
        const mainDate = new Date(mainDateString);
        const compareDate = new Date(compareDateString);

        return mainDate.getTime() > compareDate.getTime();

    }

}