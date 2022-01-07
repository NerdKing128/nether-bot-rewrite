import {
    ApplicationCommandData,
    ApplicationCommandDataResolvable,
    ApplicationCommandPermissionData,
    GuildApplicationCommandPermissionData,
} from 'discord.js';
import NerdClient from './Client';
import Command from './Command';
import { getPermList } from './Utils';

export default async function InitCommands(client: NerdClient) {
    client.guilds.cache.forEach(async (guild) => {
        // Creates a copy of the commands in a easier format
        const commands: Command[] = JSON.parse(
            JSON.stringify([...client.commands].map(([name, value]) => value))
        );

        const commandArray: ApplicationCommandDataResolvable[] = [];
        let perms: ApplicationCommandPermissionData[];
        const fullPermissions: GuildApplicationCommandPermissionData[] = [];

        commands.forEach((command) => {
            const {
                name,
                description,
                args: options,
                permissions,
                devOnly,
            } = command;
            perms = getPermList(guild, permissions);

            const cmd = {
                name,
                description,
                options,
                defaultPermission: true,
            } as ApplicationCommandData;
            if (devOnly || permissions) {
                cmd.defaultPermission = false;
            }

            fullPermissions.push({
                id: name,
                permissions: perms,
            });

            commandArray.push(cmd);
        });
        const cmds = await guild.commands.set(commandArray);
        // Turn commands into a easier format to get an id from
        const cmdArray = [...cmds].map(([name, value]) => value);
        // Replace the original permissions object id from a name to an actual Discord Snowflake (command id)

        cmdArray.forEach((cmd) => {
            const permCmd = fullPermissions.find((obj) => obj.id === cmd.name);
            permCmd!.id = cmd.id;
        });
        
        await guild.commands.permissions.set({ fullPermissions });
    });
}
