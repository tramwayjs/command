import Command from '../Command';
import InputOption from './InputOption';

export default class TestCommand extends Command {

    configure() {
        this.args.add((new InputOption('stuff', InputOption.string)).isRequired());
        this.options.add(new InputOption('str', InputOption.string));
        this.options.add((new InputOption('num', InputOption.number)).isRequired());
        this.options.add(new InputOption('arr', InputOption.array));
        this.options.add(new InputOption('bool', InputOption.boolean));
    }

    action() {
        console.log("Test command ran", typeof this.getArgument('stuff'), typeof this.getOption('num'), this.options);
    }
}