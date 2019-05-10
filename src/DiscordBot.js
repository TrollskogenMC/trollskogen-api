const Discord = require("discord.js");
const createVerifyToken = require("./createVerifyToken");
const knex = require("./knex");

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

  start(io) {
    this.io = io;
    this.client.login(process.env.BOT_TOKEN);
  }

  destroy() {
    this.client.destroy();
  }

  handleReady() {
    this.guild = this.client.guilds.get(TROLLSKOGEN_GUILD);
    this.admin = this.guild.members.find((member) => {
      return (member.user.id = process.env.ADMIN_DISCORD_ID);
    });
  }

  async handleMessage(message) {
    // only respond in direct message
    if (message.channel.type !== "dm" || message.author.bot) {
      return;
    }

    const content = message.content.trim().toLowerCase();

    if (content.indexOf("verify") === -1) {
      return;
    }

    let result;
    let user;
    const token = content.substr(-6);
    try {
      await knex.transaction(async (trx) => {
        const users = await trx
          .select()
          .from("users")
          .where({ verify_token: token });
        if (users.length === 0) {
          return message.channel.send(
            "🤔 Jag känner inte igen koden. Säker på att du skrev rätt?"
          );
        }

        [user] = users;

        const now = new Date();
        const diffMinutes =
          (now.getTime() - new Date(user.verify_token_created).getTime()) *
          1000 *
          60;
        if (diffMinutes >= 15) {
          return message.channel.send(
            "⌛ Din kod har gått ut. Skriv `/verify` på Minecraftservern för att prova igen."
          );
        }

        if (user.is_verified) {
          return message.channel.send("👍 Jag har redan verifierat dig!");
        }

        result = await trx("users")
          .where({ verify_token: token })
          .update({
            is_verified: false, // true
            verify_token_date: now,
            //verify_token: null,
            discord_user_id: message.author.id
          });
      });
    } catch (e) {
      message.channel.send("Ett oväntat fel inträffade. Admin har meddelats.");
      this.admin.send(e.message);
      console.error(e);
    }

    if (result === 1) {
      const hasSameName = message.author.username === user.last_seen_as;
      this.io.emit("verified", { userId: user.minecraft_uuid });
      this.guild
        .fetchMember(message.author)
        .addRole(this.guild.roles.find("name", "Verifierad"));
      message.channel.send(
        `Tack ${
          message.author.username
        } för att du verifierade ditt konto! 😍\n\n**Belöning:**\n\`\`\`🏠 Ett extra hem på Minecraftservern.\n🔑 Verifierad roll på Discord.\n🎤 Möjligheten att delta i ljudkanaler.\`\`\``
      );

      if (!hasSameName) {
        this.guild
          .fetchMember(message.author)
          .setNickname(user.last_seen_as)
          .then(console.log)
          .catch(console.error);
        message.channel.send(
          "Jag bytte också ut ditt namn här på Discord till det du spelar med på Minecraft. ✔️"
        );
      }
    }
    console.log(result);
  }
}

module.exports = DiscordBot;
