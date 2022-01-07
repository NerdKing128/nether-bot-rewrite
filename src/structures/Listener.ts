import { ClientEvents } from 'discord.js';

interface Listener {
    event: keyof ClientEvents;
    exec: Function; //Will find out a better way that actually does what I want soon, dm me on discord if you know a way :)
}

class Listener {
    public constructor({ event, exec }: Listener) {
        this.event = event;
        this.exec = exec;
    }
}

export default Listener;
