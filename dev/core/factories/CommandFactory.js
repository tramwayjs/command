export default class CommandFactory {
    constructor(commands) {
        this.commands = commands;
    }

    create(commandName) {
        return new this.commands[commandName]();
    }
}