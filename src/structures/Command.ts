import { ApplicationCommandOptionData, CommandInteraction, PermissionResolvable } from "discord.js";

type ExecuteFunction = (interaction: CommandInteraction, args?: object) => any

interface Command {
     name: string
     category: 'Utility' | 'Information' //Hard-coding is sad :(
     description: string
     usage?: string
     args?: ApplicationCommandOptionData | any[]
     permissions?: PermissionResolvable | null
     devOnly?: boolean
     exec: ExecuteFunction
 }

class Command {
     public constructor({ name, category, description, usage, args, permissions, devOnly, exec }: Command) {

          this.name = name
          this.category = category
          this.description = description
          this.usage = usage || ''
          this.args = args || []
          this.permissions = permissions || null
          this.devOnly = devOnly || false
          this.exec = exec
     }
}

export default Command