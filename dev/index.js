import Command from './core/Command';
import * as commands from './core/commands';
import * as terminal from './core/terminal';
import * as factories from './core/factories';

const {CommandResolver} = commands;

export default CommandResolver;

export {
    Command,
    commands, 
    terminal,
    factories,
};