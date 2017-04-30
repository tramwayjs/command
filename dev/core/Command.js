import {errors, services} from 'tramway-core';
let {AbstractMethodError} = errors;
let {TypeEnforcementService} = services;

import {InputOptions} from './commands';

export default class Command {
    constructor() {
        this.args = new InputOptions();
        this.options = new InputOptions();
    }

    /**
     * Sets up input options for command
     */
    configure() {
        throw new AbstractMethodError();
    }

    /**
     * The executable of the command
     */
    action() {
        throw new AbstractMethodError();
    }

    /**
     * @returns {{args: InputOptions, options: InputOptions}}
     */
    get() {
        return {args: this.args, options: this.options};
    }

    /**
     * 
     * @param {InputOptions} args 
     * @param {InputOptions} options 
     * @returns {Command} this
     */
    update(args, options) {
        this.args = TypeEnforcementService.enforceInstance(args, InputOptions);
        this.options = TypeEnforcementService.enforceInstance(options, InputOptions);
        return this;
    }

    /**
     * 
     * @param {string} key 
     * @returns {*}
     */
    getArgument(key) {
        return getValue(this.args, key);
    }

    /**
     * 
     * @param {string} key 
     * @returns {*}
     */
    getOption(key) {
        return getValue(this.options, key);
    }
}

/**
 * 
 * @param {InputOptions} args 
 * @param {string} key 
 * @returns {*}
 * @throws {Error}
 */
function getValue(args, key) {
    try {
        return args.getOption(key).getValue();
    } catch (e) {
        throw new Error(`Couldn't find option/argument '${key}'`);
    }
}