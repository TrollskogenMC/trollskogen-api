require("dotenv").config();
const Discord = require("discord.js");

const TROLLSKOGEN_GUILD = "540217517164068922";

class DiscordBot {
  constructor() {
    this.handleReady = this.handleReady.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    const client = new Discord.Client();
    client.on("ready", this.handleReady);
    client.on("message", this.handleMessage);

    this.client = client;
  }

  start() {
    this.client.login(process.env.BOT_TOKEN);
  }

  handleReady() {
    console.log("client ready");
    this.guild = this.client.guilds.get(TROLLSKOGEN_GUILD);

    this.guild.members.find((member) => {
      if (member.user.username === "sdf") {
        member
          .setNickname("carln", "hornta testar lite.")
          .then(console.log)
          .catch(console.error);
      }
    });
  }

  handleMessage(message) {
    if (message.content.trim().toLowerCase() === "verify") {
      message.channel.send("pong");
    }
  }
}

const bot = new DiscordBot();
bot.start();
