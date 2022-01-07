import {
    ApplicationCommandPermissionData,
    Guild,
    PermissionResolvable,
} from 'discord.js';
import config from './config.json';

export function getPermList(
    guild: Guild,
    permissions?: PermissionResolvable | null
): ApplicationCommandPermissionData[] {
    let permList: ApplicationCommandPermissionData[] = [];

    if (config.developers) {
        const devs = config.developers.map(
            (id) =>
                ({
                    id,
                    type: 'USER',
                    permission: true,
                } as ApplicationCommandPermissionData)
        );
        permList.push(...devs);
    }
    if (!permissions) return permList;

    if (Array.isArray(permissions)) {
        permissions.forEach((permission) => {
            // I don't like collections too much. Gets the roles into a easier format
            const roles = [...guild.roles.cache]
                .map(([name, value]) => value)
                .filter(
                    (role) => !role.managed && role.permissions.has(permission)
                );
            const commandPerms = roles.map(
                (role) =>
                    ({
                        id: role.id,
                        type: 'ROLE',
                        permission: true,
                    } as ApplicationCommandPermissionData)
            );
            permList.push(...commandPerms);
        });
    } else {
        const roles = [...guild.roles.cache]
            .map(([name, value]) => value)
            .filter(
                (role) => !role.managed && role.permissions.has(permissions)
            );
        const commandPerms = roles.map(
            (role) =>
                ({
                    id: role.id,
                    type: 'ROLE',
                    permission: true,
                } as ApplicationCommandPermissionData)
        );
        permList.push(...commandPerms);
    }

    return permList;
}
