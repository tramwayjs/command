import {errors} from 'tramway-core';
let {AbstractMethodError} = errors;
import {InputOptions} from './commands';

export default class Command {
    /**
     * @param {[]} args
     * @param {{}} options 
     */
    constructor() {
        this.args = new InputOptions;
        this.options = new InputOptions;
    }

    configure() {
        throw new AbstractMethodError();
    }

    action() {
        throw new AbstractMethodError();
    }

    get() {
        return {args: this.args, options: this.options};
    }

    update(args, options) {
        this.args = args;
        this.options = options;
    }
}