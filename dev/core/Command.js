import {errors} from 'tramway-core';
let {AbstractMethodError} = errors;

export default class Command {
    /**
     * 
     * @param {[]} args
     * @param {{}} options 
     */
    action(args, options) {
        throw new AbstractMethodError();
    }
}
