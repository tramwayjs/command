import Command from '../Command';
import InputOption from './InputOption';

export default class InputResolver {
    /**
     * @static
     * @param {Command} command 
     * @param {{}} args 
     * @param {{}} options 
     * @returns {Command}
     */
    static updateCommand(command, inputArgs, inputOptions) {
        let {args, options} = command.get();

        let argNames = args.getOptionNames();
        let opt = null, i = 0;

        while(opt = argNames.next().value) {
            if (InputOption.array === args.getOption(opt).getType()) {
                args.update(opt, inputArgs);
            } else {
                args.update(opt, inputArgs[i++]);
            }
        }

        argNames = options.getOptionNames();
        while(opt = argNames.next().value) {
            options.update(opt, inputOptions[opt]);
        }

        command.update(args, options);

        return command;
    }
}