import { CommandInteraction } from 'discord.js';
import NerdClient from '../structures/Client';
import Listener from '../structures/Listener';

export default class InteractionCreate extends Listener {
    public constructor(client: NerdClient) {
        super({
            event: 'interactionCreate',
            async exec(interaction: CommandInteraction) {
                if (!interaction.isCommand()) return;
                const command = client.commands.get(interaction.commandName);
                if (!command) return;
                const args: {
                    [index: string]: any;
                } = {};

                command.args?.forEach((arg) => {
                    switch (arg.type) {
                        case 'STRING':
                            args[arg.name] = interaction.options.getString(
                                arg.name
                            );
                            break;
                        case 'NUMBER':
                            args[arg.name] = interaction.options.getNumber(
                                arg.name
                            );
                            break;

                        case 'BOOLEAN':
                            args[arg.name] = interaction.options.getBoolean(
                                arg.name
                            );
                            break;

                        case 'USER':
                            args[arg.name] = interaction.options.getUser(
                                arg.name
                            );
                            break;

                        case 'ROLE':
                            args[arg.name] = interaction.options.getRole(
                                arg.name
                            );
                            break;

                        case 'CHANNEL':
                            args[arg.name] = interaction.options.getChannel(
                                arg.name
                            );
                            break;
                    }
                });

                await command.exec(interaction, args);
            },
        });
    }
}
