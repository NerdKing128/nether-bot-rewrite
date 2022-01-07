import NerdClient from '../structures/Client';
import InitCommands from '../structures/InitCommands';
import Listener from '../structures/Listener';

export default class Ready extends Listener {
    public constructor(client: NerdClient) {
        super({
            event: 'ready',
            async exec() {
                await InitCommands(client);
                console.log('Logged in.');
            },
        });
    }
}
