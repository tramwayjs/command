import Command from '../Command';
import InputOption from './InputOption';

export default class TestCommand extends Command {

    configure() {
        this.args.add(new InputOption('stuff', InputOption.string));
        this.options.add(new InputOption('str', InputOption.string));
        this.options.add(new InputOption('num', InputOption.number));
        this.options.add(new InputOption('arr', InputOption.array));
        this.options.add(new InputOption('bool', InputOption.boolean));
    }

    action() {
        console.log("Test command ran", this.args, this.options);
    }
}