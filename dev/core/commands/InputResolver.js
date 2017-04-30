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

        let i = 0;
        args.getOptions().forEach((option, key) => {
            let input = InputOption.array === option.getType() ? inputArgs : inputArgs[i++];

            if (option.getRequired() && undefined === input) {
                throw new Error(`The ${key} field is required and not set.`)
            }

            args.update(key, input);
        });

        options.getOptions().forEach((option, key) => {
            let valueIsUnset = undefined === inputOptions[key];
            let valueNotSetForNonBooleanOrArray = inputOptions[key] && ![InputOption.array, InputOption.boolean].includes(option.getType()) && 0 === inputOptions[key].length;

            if (option.getRequired() && (valueIsUnset || valueNotSetForNonBooleanOrArray)) {
                throw new Error(`The ${key} field is required and not set.`)
            }

            options.update(key, inputOptions[key]);
        });

        return command.update(args, options);
    }
}