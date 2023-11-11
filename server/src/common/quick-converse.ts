export class QcLog {
    static info(message: string): void {
        console.log(`${QcDate.formattedDateAndTime()} [INFO]: ${message}`);
    }

    static error(message: string): void {
        console.error(`${QcDate.formattedDateAndTime()} [ERROR]: ${message}`);
    }

    static log(message: string): void {
        console.log(`${QcDate.formattedDateAndTime()} ${message}`);
    }
}

export class QcDate {
    static formattedDateAndTime(): string {
        const moment = new Date(Date.now());

        const day = QcDate.checkForTwoCharacter(moment.getDay());
        const month = QcDate.checkForTwoCharacter(moment.getMonth());
        const year = String(moment.getFullYear());

        const hour = QcDate.checkForTwoCharacter(moment.getHours());
        const minute = QcDate.checkForTwoCharacter(moment.getMinutes());
        const second = QcDate.checkForTwoCharacter(moment.getSeconds());

        const formattedDate = `[${day}-${month}-${year} ${hour}:${minute}:${year}]`;
        return formattedDate;
    }

    static checkForTwoCharacter(num: number): string {
        return num < 10 ? ('0' + String(num)) : String(num);
    }
}