import {terminal} from 'terminal-kit';

export default class ProgressBar {
    constructor(title, items, options = {}) {
        const {
            width = 100,
            eta = true,
            percent = true,
            syncMode = true,
        } = options;

        this.countDown = items;
        this.items = items;

        this.progressBar = terminal.progressBar({
            title,
            items,
            width,
            eta,
            percent,
            syncMode,
        });
    }

    start(task) {
        this.progressBar.startItem(task);
        return this;
    }

    finish(task) {
        --this.countDown;
        this.progressBar.itemDone(task);

        if (this.isComplete()) {
            terminal('\n');
        }

        return this;
    }

    pause() {
        this.progressBar.pause();
        return this;
    }

    resume() {
        this.progressBar.resume();
        return this;
    }

    isComplete() {
        return 0 >= this.countDown;
    }
}