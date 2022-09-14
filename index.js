const {Client} = require('discord.js')
const client = new Client({ intents: [32767] })
client.login('')

client.on("ready", () => { console.log(`Liguei em ${client.user.tag}`) })

client.on("messageCreate", async(message) => {
    if(!message.guild || message.author.bot) return
    if(message.member.permissions.has("ADMINISTRATOR")) return;

    let antilinkregex = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    if(antilinkregex.test(message.content) === true) {
        try {
            await message.delete().catch(e => {})

            await message.guild.channels.cache.forEach(async(ch) => {
                ch.permissionOverwrites.create(message.author.id, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    SPEAK: false,
                })
            })
    
            await message.channel.send({ content: `${message.author} Você não pode **enviar links** neste servidor, por causa disso você teve seu acesso em todos os canais bloqueados!` })
        } catch (e) {
            console.log(`[OCCOREU UM ERRO NO ANTI LINK]:\n${e}`)
        }
    }
})
