import {terminal} from 'terminal-kit';
import Message from './Message';

export default class ErrorMessage extends Message {
    writeText(text) {
        terminal.wrap.red(text);
    }
}