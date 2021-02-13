const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('Nzg5MTg0MzQ4MzcyNDY3NzMy.X9uXMg.EZJbzJ1CUvRvRheZgetAqWF1glI');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////


////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });
      

    client.user.setActivity(`Type: ${PREFIX}help | ${client.guilds.cache.size} Server,Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)},`, { type: "PLAYING"});
   
  
      }, (5000));
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("#c219d8").setAuthor(`${message.author.username}, My Prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({dynamic:true})));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}help`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
     message.react("✅");
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.avatarURL({dynamic: "true"}))
      .setAuthor("Help Commands!","https://cdn.discordapp.com/attachments/748984375772840046/800487276173328445/f7179eb460f2925c2edab10872a3c6f6.gif?v=1&size=64")
    .setImage('https://cdn.discordapp.com/attachments/748984375772840046/800487276173328445/f7179eb460f2925c2edab10872a3c6f6.gif')
    
    .setTitle("NEW UPDATE IN PLAY <a:emoji_14:798996615989166132> ")
    .setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))

    .setDescription(`\`≪  Prefix Bot ${PREFIX}  ≫

      <a:emoji_36:800462529532657665> command music <a:emoji_36:800462529532657665>

 <a:emoji_39:800462776564711455> a?loop 
 <a:emoji_39:800462776564711455> a?lyrics
 <a:emoji_39:800462776564711455> a?np                
 <a:emoji_39:800462776564711455> a?pause
 <a:emoji_39:800462776564711455> a?play                   
 <a:emoji_39:800462776564711455> a?queue
 <a:emoji_39:800462776564711455> a?radio                 
 <a:emoji_39:800462776564711455> a?remove
 <a:emoji_39:800462776564711455> a?resume             
 <a:emoji_39:800462776564711455> a?search
 <a:emoji_39:800462776564711455> a?shuffle              
 <a:emoji_39:800462776564711455> a?skip
 <a:emoji_39:800462776564711455> a?skipto               
 <a:emoji_39:800462776564711455> a?stop
 <a:emoji_39:800462776564711455> a?volume

      <a:emoji_8:798993463831035916> Filter Commands <a:emoji_8:798993463831035916>

 <a:emoji_19:799004464563748925> a?fi 8D
 <a:emoji_19:799004464563748925> a?fi tremolo
 <a:emoji_19:799004464563748925> a?fi vibrato
 <a:emoji_19:799004464563748925> a?fi pulsator
 <a:emoji_19:799004464563748925> a?fi clear
 <a:emoji_19:799004464563748925> a?fi bassboost
 <a:emoji_19:799004464563748925> a?fi vaporwave

      <a:emoji_13:798996360648327168> Others <a:emoji_13:798996360648327168>
 <a:emoji_33:799375002209615882> a?help              <a:emoji_33:799375002209615882> a?ping
 <a:emoji_33:799375002209615882> a?prefix            <a:emoji_33:799375002209615882> a?uptime





**[   SUPPORT  ](https://discord.gg/HqaFQMTxJ9)** -  [   INVITE   ](https://discord.com/api/oauth2/authorize?client_id=789888742928023573&permissions=0&scope=bot) `)

    //delete the Command
  //////  message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }
 

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#c219d8")
      .setTitle(`<:no:770326304473350145> Please wait \`${timeLeft.toFixed(1)} seconds\` before reusing the \`${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#c219d8")
   .setTitle(`<:no:770326304473350145> There was an error executing that command.`)).catch(console.error);
 }


});
function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}
//////////////
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(PREFIX.length);
  let args = message.content.split(" ").slice(1);
  if (command == "say") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "ADMINISTRATOR ليس لديك صلاحيات rolling_eyes"
      );
    message.channel.send("" + args.join(" "));
    message.delete();
  }
});
//////////
client.on("message", message => {
  if (message.content.toLowerCase() === PREFIX + "roles") {
    let roles = message.guild.roles.cache
      .map(r => `[ ${r.name}  - Color ${r.color} ]`)
      .join("\n");
    let embed = new Discord.MessageEmbed()
      .setTitle("Server Roles")
      .setDescription(" ```javascript\n" + roles + "``` ");
    message.channel.send(embed);
  }
  if (message.content.toLowerCase() === PREFIX + "help roles") {
    let roles = new Discord.MessageEmbed()
      .setTitle(`Command: roles `)
      .addField("Usage", `${PREFIX}roles`)
      .addField("Information", "Show All Roles For Server");
    message.channel.send(roles);
  }
});
/////////
client.on("message", async message => {
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);
  if (command == "avatar") {
    let args = message.content.split(" ");
    let user =
      message.mentions.users.first() ||
      message.author ||
      message.guild.member.cache.get(args[1]);
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(user.username)
        .setDescription(`**[Avatar Link](${user.avatarURL()})**`)
        .setImage(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
    );
  }
});
///////
client.on("message", async message => {
  if (message.content.startsWith(PREFIX + "lock")) {
    if (!message.channel.guild)
      return message.channel.send(
        "ghallat" + "** | Sorry This Command Only For Servers .**"
      );

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    });
    const lock = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `<a:emoji_3:784873566428332033>| Locked Channel
Channel Name : <#${message.channel.id}>
Locked By : <@${message.author.id}>
`
      )
       .setThumbnail(message.author.avatarURL({dynamic: "true"}))
      .setAuthor(message.author.username, message.author.displayAvatarURL)
    message.channel.send(lock);
  }
});


//Bot coded by Tomato#6966 
