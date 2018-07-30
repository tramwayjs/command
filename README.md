Tramway Command is a simple CLI building tool to write scripts to accompany a Tramway project built in ES2015+. It includes:

1. A standard interface for writing commands.
2. A flexible way to create multiple namespaces.
3. An indexing system capable of plugging into tramway-core-dependency-injector and avoiding file clutter
4. Control of argument names, types and if they're required
5. Terminal utilities to aide in creating rich terminal applications

# Installation:
1. `npm install tramway-command`

# Example project:
https://gitlab.com/tramwayjs/tramway-command-example

# Documentation

## Recommended Folder Structure
- config
- commands

## Config
The config file for commands will contain a JSON hashmap of commands to a string representation.

```
import TestCommand from '../commands/TestCommand';
export default {
    "test:command": TestCommand
};
```

## Commands
Commands let you perform and automate tasks or create helpful utilities without needing to create a GUI. 

To create a command, import the class and implement a derived class with the abstracted stubs to get the most out of it. 

```
import {Command, commands} from 'tramway-command';
let {InputOption} = commands;

export default class TestCommand extends Command {
    configure() {
        this.args.add((new InputOption('input', InputOption.string)).isRequired());
        this.options.add(new InputOption('str', InputOption.string));
        this.options.add((new InputOption('num', InputOption.number)).isRequired());
        this.options.add(new InputOption('arr', InputOption.array));
        this.options.add(new InputOption('bool', InputOption.boolean));
    }

    action() {
        console.log("Test command ran, here's some of what you gave it", this.arguments, this.options);
    }
}
```

| Function | Usage |
| ----- | ----- |
| ```constructor()``` | Handles any dependency injection that can instantiated in the index or using [`tramway-core-dependency-injector`](https://gitlab.com/tramwayjs/tramway-core-dependency-injector) |
| ```action()``` | The main runner of the command, will be executed when the index maps the CLI to it. | 
| ```configure()``` | The configuration of the command, determines argument mapping and the order. Here is where `InputOption` objects are instantiated |
| ```getArgument(name)``` | Does not need to be implemented, gives access to the value of the mapped argument. (See Input Option section) |
| ```getOption(name)``` | Does not need to be implemented, gives access to the value of the option. (See Input Option section) |

### Input Option
All arguments start as `InputOption` objects which handle and validate your inputs.

An argument is the ordered sequence of input after the command name in the CLI. An option is a mapped key-value pair from the CLI and can be added in any order.

The constructor arguments are as follows:

| Argument | Usage |
| ----- | ----- |
| ```name``` | The name of the argument used to access it both programmatically and in the CLI |
| ```type``` | One of the main pre-defined types in the `InputOption` object. Your input value will be cast to this type | 
| ```defaultValue``` | The default value the command will recieve if the argument or option isn't given one |

Some extra functionality can be added, for now we can determine if an option is required by setting the required flag using the `isRequired` function. By default no arguments or options are set to required. An exception will be thrown in the event that a required option/argument isn't present.

Any extra and undeclared options will be ignored at runtime.

## Spinning up commands with the Command Resolver
The `CommandResolver` encapsulates the necessary logic to turn an index of commands into a powerful namespace that let's you use commmands as classes in any directory you want in the project. NodeJS can run any file so the most convenient way to get a desirable executable path is to create the dedicated commands runner file in the root of your project (or the root of your dev directory that will be transpiled).

Depending how you set up the command resolver, the command format will generally follow this template when running it in a terminal:

```
node namespace command-name [arguments] [options]
```

To achieve a simple CLI that takes the following format:

```
node command test-command arg1 --option1 5
```

You will need to create a `command.js` file in the `dev` directory of a typical tramway project. It will be transpiled at the root of your app.

Inside the `command.js` file, you will want to import the index, instantiate the Command Resolver and run it.

```
import {commands} from 'tramway-command`;
let {CommandResolver} = commands;
import index from './config/commands.js';

export default (new CommandResolver(index)).run();
```

The namespace is determined by the name of the file and you can create multiple namespaces with multiple namespace-specific indexes with the code above. For example, if you wanted to make commands specifically for migrations, you could also add a `migrations.js` file with the command resolver and run migrations via `node migrations someMigrationCommand`.

## Terminal Utilities
Tramway Command implements wrappers for [terminal-kit](https://github.com/cronvel/terminal-kit).

```
import {terminal} from 'tramway-command';
```

### Console message formatting

Information:
Prints a message in blue.

```
const {Message, TimestampLog} = terminal;
new Message('message');
new TimestampLog('message')
```

Success:
Prints a message in green.

```
const {SuccessMessage, TimestampSuccess} = terminal;
new SuccessMessage('message');
new TimestampSuccess('message')
```

Warning:
Prints a message in yellow.

```
const {WarningMessage, TimestampWarning} = terminal;
new WarningMessage('message');
new TimestampWarning('message')
```

Error:
Prints a message in red.

```
const {ErrorMessage, TimestampError} = terminal;
new ErrorMessage('message');
new TimestampError('message')
```

### Progress Bar

```
const {ProgressBar} = terminal;
```

| Argument | Usage |
| ----- | ----- |
| ```title``` | The name of the argument used to access it both programmatically and in the CLI |
| ```items``` | One of the main pre-defined types in the `InputOption` object. Your input value will be cast to this type | 
| ```options``` | The default value the command will recieve if the argument or option isn't given one |

The `ProgressBar` includes the following methods:

| Function | Usage |
| ----- | ----- |
| ```start(task: string)``` | Starts a task, increments progress |
| ```finish(task: string)``` | Finishes a task, increments progress |
| ```pause()``` | Pauses the current progress bar |
| ```resume()``` | Resumes the progress bar from the state it left off |
| ```isComplete(): boolean``` | Determine if the progress bar is at 100% |

