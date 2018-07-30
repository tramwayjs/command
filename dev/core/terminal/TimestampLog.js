import {terminal} from 'terminal-kit';
import Message from './Message';

export default class TimestampLog extends Message {
    build(text) {
        this.writeTimeStamp();
        terminal.wrap.white(' - ');
        this.writeText(text);
    }

    writeTimeStamp() {
        terminal.wrap.yellow(new Date().toISOString());
    }
}