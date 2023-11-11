import { appendFile } from 'node:fs/promises';
import { QcDate } from '../common/quick-converse';

export class ServerErrorHandler {
    private static monitorLogLog() {

    }

    static async LogErrorInFile(error: Error) {
        let errorData = QcDate.formattedDateAndTime();
        errorData += ` [${error.name}]: ${error.message}`
    }
}