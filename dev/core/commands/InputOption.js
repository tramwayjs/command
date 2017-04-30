const number = "number";
const string = "string";
const array = "array";
const boolean = "boolean";

const validTypes = [number, string, array, boolean];

class InputOption {
    /**
     * 
     * @param {string} name 
     * @param {string} type Must be a valid type: number|string|array|boolean
     * @param {*} defaultValue 
     */
    constructor(name, type, defaultValue) {
        this.name = name;
        
        if (!validTypes.includes(type)) {
            throw new Error(`The type must be a valid type: ${validTypes.toString()}`)
        }

        this.type = type;
        this.defaultValue = defaultValue || null;
        this.value = this.defaultValue;
    }

    /**
     * 
     * @param {*} value 
     * @returns {InputOption} this
     */
    setValue(value) {
        if (this.type !== typeof value) {
            switch(this.type) {
                case number: value = Number(value); break;
                case boolean: value = Boolean(value); break;
                case string: value = value && String(value); break;
            }
        }

        this.value = value || this.defaultValue;
        return this;
    }

    /**
     * @returns {*}
     */
    getValue() {
        return this.value;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {string}
     */
    getType() {
        return this.type;
    }

    /**
     * @returns {boolean}
     */
    getRequired() {
        return Boolean(this.required);
    }

    /**
     * @returns {InputOption} this
     */
    isRequired() {
        this.required = true;
        return this;
    }
};

InputOption.number = number;
InputOption.string = string;
InputOption.array = array;
InputOption.boolean = boolean;

export default InputOption;