Tramway Command is a simple CLI building tool to write scripts to accompany a Tramway project built in ES2015+. It includes:

1. A standard interface for writing commands.
2. A flexible way to create multiple namespaces.
3. An indexing system capable of plugging into tramway-core-dependency-injector and avoiding file clutter
4. Flexible arguments parsing

# Installation:
1. `npm install tramway-command`

# Example project:
https://gitlab.com/tramwayjs/tramway-example

# Documentation

## Recommended Folder Structure
- config
- commands

## Config
The config file for commands will contain a JSON hashmap of commands to a string representation.

```
import {TestCommand} from '/commands/TestCommand';
export default {
    "test-command": new TestCommand()
};
```

## Commands
Commands let you perform and automate tasks or create helpful utilities without needing to create a GUI. 

To create a command, import the class and implement a derived class with the abstracted stubs to get the most out of it. 

```
import {Command} from 'tramway-command';

export default class TestCommand extends Command {
    action(args, options) {
        console.log("Test command ran", args, options);
    }
}
```

| Function | Usage |
| ----- | ----- |
| ```constructor()``` | Handles any dependency injection that can instantiated in the index or using [`tramway-core-dependency-injector`](https://gitlab.com/tramwayjs/tramway-core-dependency-injector) |
| ```action(args: [], options: {})``` | The main runner of the command, will be executed when the index maps the CLI to it. Arguments are passed as an ordered array and options are passed as a mapped object | 

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

(new CommandResolver(index)).run();
```

The namespace is determined by the name of the file and you can create multiple namespaces with multiple namespace-specific indexes with the code above. For example, if you wanted to make commands specifically for migrations, you could also add a `migrations.js` file with the command resolver and run migrations via `node migrations someMigrationCommand`.

## Flexible options
The premise behind the arguments and options template is to provide a simple way to provide flexible arguments.

The following command

```
node command test-command 4 5 --compare 7 0 --remove 6
```

will set the parameters of the `TestCommand`'s `action` function to the following:

| parameter | value |
| ----- | ----- |
| args | ```[4, 5]``` |
| options | ```{"compare": [7, 0], "remove": [6]}```|

These arguments are flexible, can be dereferenced and can be treated as function arguments.