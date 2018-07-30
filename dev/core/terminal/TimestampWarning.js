import {terminal} from 'terminal-kit';
import WarningMessage from "./WarningMessage";

export default class TimestampWarning extends WarningMessage {
    build(text) {
        this.writeTimeStamp();
        terminal.wrap.white(' - ');
        this.writeText(text);
    }

    writeTimeStamp() {
        terminal.wrap.yellow(new Date().toISOString());
    }
}