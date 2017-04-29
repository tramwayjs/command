const number = "number";
const string = "string";
const array = "array";
const boolean = "boolean";

const validTypes = [number, string, array, boolean];

class InputOption {
    constructor(name, type, defaultValue) {
        this.name = name;
        
        if (!validTypes.includes(type)) {
            throw new Error(`The type must be a valid type: ${validTypes.toString()}`)
        }

        this.type = type;
        this.defaultValue = defaultValue;
        this.value = null;
    }

    setValue(value) {
        if (this.type !== typeof value) {
            switch(this.type) {
                case number: value = Number(value); break;
                case string: value = String(value); break;
                case boolean: value = Boolean(value); break;
            }
        }
        
        this.value = value;
        return this;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }
};

InputOption.number = number;
InputOption.string = string;
InputOption.array = array;
InputOption.boolean = boolean;

export default InputOption;