import {terminal} from 'terminal-kit';
import SuccessMessage from "./SuccessMessage";

export default class TimestampSuccess extends SuccessMessage {
    build(text) {
        this.writeTimeStamp();
        terminal.wrap.white(' - ');
        this.writeText(text);
    }

    writeTimeStamp() {
        terminal.wrap.yellow(new Date().toISOString());
    }
}