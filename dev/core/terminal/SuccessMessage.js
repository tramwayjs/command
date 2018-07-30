import {terminal} from 'terminal-kit';
import Message from './Message';

export default class SuccessMessage extends Message {
    writeText(text) {
        terminal.wrap.green(text);
    }
}