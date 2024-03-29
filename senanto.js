const{ Client, Partials, Discord, MessageAutoDeleteTrigger } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const fs = require('fs');
const { prefix } = require('./config.json');
require('dotenv').config();

let token = process.env.TOKEN;
if (!token) {
    const config = require('./config.json');
    token = config.token;
}
if (!token) {
    console.error('Token bulunamadı. Lütfen .env dosyasında veya config.json dosyası içine token değerinizi tanımlayın.');
    process.exit(1);
}

// Bu kısım uptime etmek isteyenler için küçük bir örnek web server oluşturma kodudur
// Başındaki yorum satırlarını kaldırdıktan sonra konsolunuza 'npm i express' yazın çalışacaktır
// -------------------------------------- 
// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//  res.send('Puero');
// });
// app.listen(80);
// -------------------------------------- 

client.once('ready', () => {
  console.log(`[ ONLINE ] - ${client.user.tag}`);
  console.log('[ OWNER ] - senanto);
  console.log('[ Discord ] - senanto#0');
});
client.commands = new Map();

const komutlar = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

for (const file of komutlar) {
  const command = require(`./komutlar/${file}`);
  client.commands.set(command.name, command);
}

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const komut = args.shift().toLowerCase();
  if (!client.commands.has(komut)) return;
  const command = client.commands.get(komut);
  try {
    command.execute(message, args, client); 
  } catch (error) {
    console.error(error);
    message.reply(':x: Üzgünüm bir hata ile karşılaştım. Sorunun devam ederse destek sunucusuna katılabilirsiniz. https://discord.gg/6w4QfBubKY');
  }
});

client.login(token);
