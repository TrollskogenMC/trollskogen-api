import Discord from "discord.js";
import db, { makeDb } from "./data-access/index.js";

const TROLLSKOGEN_GUILD = "540217517164068922";

export default class DiscordBot {
  constructor() {
    this.handleReady = this.handleReady.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    const client = new Discord.Client();
    client.on("ready", this.handleReady);
    client.on("message", this.handleMessage);
    // client.on("guildMemberRemove", this.handleGuildMemberRemove);

    this.client = client;
  }

  start(io) {
    this.io = io;
    this.client.login(process.env.BOT_TOKEN);
  }

  destroy() {
    this.client.destroy();
  }

  // async handleGuildMemberRemove(member) {
  //   const result = await knex()
  //     .table("users")
  //     .where({ discord_user_id: member.id });
  //   let user;
  //   if (result.length === 1) {
  //     [user] = result;
  //   } else {
  //     console.error(`Failed to get single user by discord id: ${  member.id}`);
  //     return;
  //   }
  // }

  handleReady() {
    this.guild = this.client.guilds.get(TROLLSKOGEN_GUILD);

    this.admin = this.guild.members.find(
      (member) => (member.user.id = process.env.ADMIN_DISCORD_ID)
    );
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

    const discordUserId = message.author.id;
    let user;
    const token = content.substr(-6);
    const database = makeDb();
    const trxProvider = database.transactionProvider();
    const trx = await trxProvider();
    let modifiedRows;
    try {
      user = await db.findUserByTokenOrDiscordId({ token, discordUserId, trx });
      if (user && user.is_verified) {
        message.channel.send("👍 Jag har redan verifierat dig!");
        return;
      }

      if (!user) {
        message.channel.send(
          "🤔 Jag känner inte igen koden. Säker på att du skrev rätt?"
        );
        return;
      }

      const now = new Date();
      const diffMinutes =
        (now.getTime() - new Date(user.verify_token_created).getTime()) /
        1000 /
        60;
      if (diffMinutes >= 15) {
        message.channel.send(
          "⌛ Din kod har gått ut. Skriv `/verify` på Minecraftservern för att generera en ny kod."
        );
        return;
      }
      if (user.is_verified) {
        message.channel.send("👍 Jag har redan verifierat dig!");
        return;
      }

      modifiedRows = await db.updateVerifiedUser({
        token,
        date: now,
        discordUserId,
        trx
      });
      trx.commit();
    } catch (e) {
      message.channel.send("Ett oväntat fel inträffade. Admin har meddelats.");
      this.admin.send(e.message);
      trx.rollback();
      console.error(e);
    }

    if (modifiedRows === 1) {
      this.io.emit("verified", { userId: user.minecraft_uuid });
      const guildMember = await this.guild.fetchMember(message.author);

      const discordName = guildMember.nickname
        ? guildMember.nickname
        : message.author.username;
      const hasSameName = discordName === user.last_seen_as;

      await guildMember.addRole(this.guild.roles.find("name", "Verifierad"));
      message.channel.send(
        `Tack ${
          message.author.username
        } för att du verifierade ditt konto! 😍\n\n**Belöning:**\n\`\`\`🏠 Ett extra hem på Minecraftservern.\n🔑 Verifierad roll på Discord.\n🎤 Möjligheten att delta i ljudkanaler.\`\`\``
      );
      if (!hasSameName) {
        guildMember
          .setNickname(user.last_seen_as)
          .then(console.log)
          .catch(console.error);
        message.channel.send(
          "Jag bytte också ut ditt namn här på Discord till det du spelar med på Minecraft ✔️"
        );
      }
    }
  }
}
