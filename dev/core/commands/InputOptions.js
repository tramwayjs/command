import InputOption from './InputOption';
import {errors} from 'tramway-core';
let {WrongTypeError} = errors;

export default class InputOptions {
    constructor () {
        this.options = new Map();
    }

    /**
     * @param {InputOption} option 
     * @returns {InputOptions} this
     */
    add(option) {
        if (!option instanceof InputOption) {
            throw new WrongTypeError(InputOption.name);
        }

        this.options.set(option.getName(), option);
        return this;
    }

    /**
     * @returns {Map<string, InputOption>}
     */
    getOptions() {
        return this.options;
    }

    /**
     * @param {string} option 
     * @returns {InputOption}
     */
    getOption(option) {
        return this.options.get(option);
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     * @returns {InputOptions}
     */
    update(key, value) {
        let option = this.getOption(key);
        try {
            option.setValue(value);
            this.options.set(key, option);
        } catch (e) {
            throw new Error(`Option for ${key} doesn't exist`);
        }
        return this;
    }
}