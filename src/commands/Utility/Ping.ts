import NerdClient from "../../client/Client";
import Command from "../../structures/Command";

export default class Ping extends Command {
    public constructor(client: NerdClient) {
        super({
            name: 'ping',
            category: 'Utility',
            description: 'Sends a message that displays the current latency.',
            async exec(interaction) {

            }
        })
    }
}