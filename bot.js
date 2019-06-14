const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
let loglar = JSON.parse(fs.readFileSync("./loglar.json", "utf8"));
require('./util/eventLoader')(client);
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

var prefix = ayarlar.prefix;

client.on('ready', ()  => {
  console.log(`Botun olan  ${client.user.tag} Artık Aktif`);
});
client.on('message', msg => {
  if (msg.content === 'sa') {
    msg.channel.sendMessage('**Aleyküm Selam**');
    }
    if (msg.content === 'selam') {
      msg.channel.sendMessage('**Aleyküm Selam**');
    }
      if (msg.content === 'selamun aleyküm') {
        msg.channel.sendMessage('**Aleyküm Selam**');
    }
    client.reload = command => {
      return new Promise((resolve, reject) => {
        try {
          delete require.cache[require.resolve(`./komutlar/${command}`)];
          let cmd = require(`./komutlar/${command}`);
          client.commands.delete(command);
          client.aliases.forEach((cmd, alias) => {
            if (cmd === command) client.aliases.delete(alias);
          });
          client.commands.set(command, cmd);
          cmd.conf.aliases.forEach(alias => {
            client.aliases.set(alias, cmd.help.name);
          });
          resolve();
        } catch (e){
          reject(e);
        }
      });
    };
    client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
if (msg.content.toLowerCase() === prefix + 'adam' ) (
  msg.reply('1Rip')
   )
});
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.has.Permission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.has.Permission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

	const eğlence = new  Discord.RichEmbed()
	.setColor()
	.setAuthor(`1Rip`, client.user.avatarURL)
	.setThumbnail(client.user.avatarURL)
	.addField(`Eğlence Komutları`, `**r!atatürk** = Atatürk İle İlgili Gif Atar. \n**r!avatarım** = Avatarını Atar. \n**r!davet** = Botun Davet Linkini Atar. \n**!!istatistik** = Botun İstatistiklerini Gösterir. \n**!!kahkaha** = Kahkaha Atarsın. \n**r!kısalt** = Bir Link Kısaltırsın. Kullanım => r!kısalt URL \n**r!nah** = Nah Gifi Atar. \n**r!ortaparmak** = Rastgele Ortaparmak Gifi Atar. \n**r!wasted** = Rastgele Wasted Gifi Atar. \n**r!wwegif** = Rasgele WWE Gifi Atar. \n**r!kedi** = Rastgele Kedi Resimleri Atar.`)
    .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)

    return message.channel.sendEmbed(eğlence);

};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['eğlence'],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Eğlence Komutları.',
  usage: 'eğlence'
};
client.on('guildBanAdd' , (guild, user) => {
  let aramızakatılanlar = guild.channels.find('name',  'aramıza-katılanlar');
  if (!aramızakatılanlar) return;
  aramızakatılanlar.send('https://media.giphy.com/media/8njotXALXXNrW/giphy.gif **Adalet dağıtma zamanı gelmiş!** '+ user.username +'**Bakıyorum da suç işlemiş,Cezası Verildi!** :fist: :writing_hand:  :spy:' );
});
module.exports.run = async (bot, message, args) => {

    let replies = ["https://yunti.files.wordpress.com/2017/04/ataturk_bayrak_03_tam35-blogspot-com.gif", "https://yunti.files.wordpress.com/2016/11/bayrak_10_yunus_tam35-blogspot-com.gif", "https://yunti.files.wordpress.com/2018/02/ataturk_bayrak_05_tam35-blogspot-com.gif", "https://yunti.files.wordpress.com/2018/02/ataturk_bayrak_06_tam35-blogspot-com.gif", "https://i.pinimg.com/originals/56/38/9f/56389f8523920b8e492286db350031b0.gif", "https://img-s2.onedio.com/id-581d7278b2d2559c5474bf7f/rev-0/w-635/f-jpg-gif-webp-webm-mp4/s-6f0b4aa098dd277a1aec0e21e8ad6df93e9dffe4.gif", "http://liseyehazirlik.com/wp-content/uploads/2017/08/atat.gif"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Gazi Mustafa Kemal Atatürk")
        .setColor("#FF69B4")
        .setFooter(`${message.author.tag} `, message.author.avatarURL)
        .setImage(replies[result]);

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ata"],
  permLevel: 0
};

exports.help = {
  name: 'atatürk',
  description: 'Bot Atatürk resmi atar',
  usage: 'atatürk'
};
client.login('NTg4NzMxNDI3NDkxODA3MjMy.XQPHDg.nExfZAIwpcqIQwBLCwONGrL0dbc');
