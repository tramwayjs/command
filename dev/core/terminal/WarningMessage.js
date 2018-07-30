import {terminal} from 'terminal-kit';
import Message from './Message';

export default class WarningMessage extends Message {
    writeText(text) {
        terminal.wrap.yellow(text);
    }
}