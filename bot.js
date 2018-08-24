const discord = require('discord.js')
const bot = new discord.Client()
const roblox = require('roblox-js')
bot.login(process.env.bottok)
roblox.login('FreakingHulk', process.env.password).catch(err => console.error("Something went wrong."))

bot.commands = new discord.Collection()
console.log("Loading commands...")
require('fs').readdir('./commands/', (err, files) => {
  if (err) console.log("Couldn't load commands.")
  files.filter(f => f.split(".").pop() === "js").forEach((f,i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`))
  })
})

bot.on('ready', () => {
  bot.user.setActivity('over Rangers of Fire', {type: "WATCHING"})
  console.log("GroupBot ready.")
})

bot.on('message', message => {
  let args = message.content.split(" ").slice(1)
  if (message.content.startsWith(":shout")) {
    let msg = args.join(' ');
    message.channel.send("Shouting...")
    roblox.shout(4173965, msg).then(() => message.channel.send("Shouted "+msg+" to group 4173965."))
    .catch(() => message.channel.send("Something went wrong..."))
  }
})
