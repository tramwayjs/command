import Command from '../Command';
import {errors} from 'tramway-core';
let {WrongTypeError} = errors;
import InputResolver from './InputResolver';
import { CommandFactory } from '../factories';

export default class CommandResolver {
    /**
     * 
     * @param {{}} commands 
     * @param {CommandFactory} factory
     */
    constructor(commands = {}, factory) {
        this.factory = factory || new CommandFactory(commands);
    }
    
    /**
     * Prepares and executes the command
     */
    run() {
        let args = process.argv.slice(2);
        const commandName = args.shift();
        let options = this.getOptions(args);

        try {
            let command = this.factory.create(commandName);

            if (!(command instanceof Command)) {
                throw new WrongTypeError(Command.name);
            } else {
                command.configure();
                command = InputResolver.updateCommand(command, args, options);
                command.action();
            }
        } catch (e) {
            if (e instanceof TypeError && e.message === "Cannot read property 'action' of undefined") {
                console.error(`Command: '${commandName}' could not be found.`);
            } else {
                throw e;
            }
        }
    }

    /**
     * 
     * @param {[]} args 
     */
    getOptions(args) {
        let options = {};

        args.slice().reverse().forEach(function(arg, i, items){
            if ("--" !== arg.substring(0, 2)) {
                return;
            }

            let option = args.splice(items.length - 1 - i, i + 1);
            const key = option.shift().slice(2);
            options[key] = option;
        });

        return options;
    }
}