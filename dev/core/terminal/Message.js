import {terminal} from 'terminal-kit';

export default class Message {
    constructor(text) {
        this.build(text);
        terminal('\n');
    }

    build(text) {
        this.writeText(text);
    }

    writeText(text) {
        terminal.wrap.blue(text);
    }
}