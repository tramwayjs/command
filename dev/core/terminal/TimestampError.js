import {terminal} from 'terminal-kit';
import ErrorMessage from "./ErrorMessage";

export default class TimestampError extends ErrorMessage {
    build(text) {
        this.writeTimeStamp();
        terminal.wrap.white(' - ');
        this.writeText(text);
    }

    writeTimeStamp() {
        terminal.wrap.yellow(new Date().toISOString());
    }
}