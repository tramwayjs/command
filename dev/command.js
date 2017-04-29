import CommandResolver from './core/commands/CommandResolver';
import TestCommand from './core/commands/TestCommand';

let someIndex = {
    'testCommand': TestCommand
};

export default (new CommandResolver(someIndex)).run();