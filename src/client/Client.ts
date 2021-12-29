import { Client, ClientOptions, Collection, Intents } from "discord.js";
import 'dotenv/config'
import { readdirSync } from 'fs'
import { join } from 'path'
import Command from "../structures/Command";

export default class NerdClient extends Client {
    commands: Collection<string, Command> = new Collection()
    public constructor() {
        super({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS ], allowedMentions: { repliedUser: false } } as ClientOptions)

    }

    private async _init() {

        const dirs = readdirSync(join(__dirname, '..', 'commands'))
         dirs.forEach(dir => {

             const commandFiles = readdirSync(join(__dirname, '..', `commands/${dir}`))  
             commandFiles.forEach(async file => {
                 
                 const commandClass = (await import(join(__dirname, '..', `commands/${dir}/${file}`)))?.default
                  const command: Command = new commandClass(this)!

                  this.commands.set(command.name, command)
             })
         })
    }

    public async start() {
        await this._init()
        await this.login(process.env.TOKEN)
    }
}