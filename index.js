const Discord = require ('discord.js')
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const { MessageEmbed } = require('discord.js')

var nl = 2;
var points = 0


const fs = require("fs")
client.msgs = require ("./party.json")


client.once('ready', () =>{

    console.log('Ready!')
    client.user.setActivity('| !ajuda |')

})

client.on('message', message => {
    const authorid = message.author.id
    const user = client.users.cache.get(authorid)
    
    if(message.content === 'teste'){
        message.reply('Done! Its all working')
    }

    if(message.content === '!create'){
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            message.guild.roles.create({
                data: {
                name: 'Lobby 1',
                color: 'BLUE',
                },  
            })
            message.reply('Role Lobby 1 was created!')
        }else{
            message.reply('You dont have the permition to create a role, please contact the staff if you really need')
        }
        
    }

    if(message.content.startsWith('!kick')){

        member.kick().then((member) => {     
            message.channel.send(":wave:" + member.displayName + " has been kicked!")
        })
    }
    if(message.content === '!ajuda') {
        message.reply('chamaste o comando de ajuda. Aqui estão os vários comandos que podes usar no servidor: \n!invite - link de convite para o server \n!mayhem - comando a explicar como consegues ficar habilitado para competir nos nossos torneios')
    }

    if(message.content === '!invite') {
        message.reply('aqui tens o link para conseguires convidar todos os teus amigos para o servidor: \nhttps://discord.gg/4ErwFsM')
    }

    if(message.content === '!mayhem') {
        message.reply('para conseguires estar habilitado para jogar os torneios basta seguires os passos do vídeo explicativo na aba #explicação-vídeo🎞 ou então ler os passos na aba #mayhem🎮.Caso estejas com algum problema, contacta o @Owner ou então reporta o problema na aba #report-a-problem📩')
    }

    if (message.content === '!pvp'){  

        let role = message.guild.roles.cache.find(role => role.name === 'Lobby ' + (nl-1))
        let user = message.member.displayName
        
        if(message.member.roles.cache.some(role => role.name.startsWith('Lobby'))){

            message.reply('You are already in a 1v1, please end it first to play again\nIf this is an error, please contact staff')

        }else{

            if(user.startsWith('[')){

            }else{

                if(message.member.hasPermission(['ADMINISTRATOR', 'CHANGE_NICKNAME'])){
                    message.reply('You have some of this permissions (administrator or change nicknames) so I can´t change your nickname\nPlease put [0] on the begining of your name to play creative 1v1')

                }else{

                message.member.setNickname('[0] ' + user)
                } 
        
            }
            message.guild.channels.create ('lobby ' + (nl-1), {
                userLimit: 2 ,
                permissionOverwrites: [
                    {
                        id: '726095313466818610' , //trocar
                        deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'] ,     
                    },{
                        id: role.id ,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] ,
                    },
                ],
            }) 
            message.guild.roles.create({
                data: {
                name: 'Lobby ' + nl,
                color: 'BLUE',
                },  
            })            
            player1 = message.author.username
    
            client.msgs [message.author.username] = {
                player1: message.author.username
            }
            fs.writeFile ("./party.json", JSON.stringify (client.msgs, null, 4), err =>{
                if(err) throw err
                message.channel.send ('username written')
            })
            
            message.member.roles.add(role.id)

        }
        
    }
    
    if(message.content === '!accept'){
        let user = message.member.displayName
        player2 = message.author.username

        if(message.member.roles.cache.some(role => role.name.startsWith('Lobby'))){

            message.reply('You are already in a 1v1, please end it first to play again\nIf this is an error, please contact staff')

        }else{

            if(player1 === player2){
                message.channel.send('Não podes jogar contra ti mesmo. Por favor aguarda até teres um oponente')
            }else{
                message.channel.send('Aceitaste a partida de @' + player1 + '\n...a criar lobby...')
                let role = message.guild.roles.cache.find(role => role.name === 'Lobby ' + (nl-1))        
                message.member.roles.add(role.id)
                let createdLobby = message.guild.channels.cache.find(channel => channel.name === 'lobby-' + (nl-1))
                if(createdLobby){
                    const creative1v1msg = new MessageEmbed()
                    .setTitle("Creative 1v1")
                    .setColor(0xE67E22)
                    .setDescription(`Luta contra o teu adversário para ver quem é melhor (até aos 10)!\nPoderás escolher com o teu adversário o mapa que pretenderes.\nCaso o adversário fique mais do que 5 minutos afk, por favor contacta a staff para ajuda\nQuem ganhar dê !gg para sair. **GL**`);
                    createdLobby.send(creative1v1msg)               
                }else{
                    message.reply('Não é possível criar ')
                }
            }
            if(user.startsWith('[')){
                }else{
                    if(message.member.hasPermission(['ADMINISTRATOR', 'CHANGE_NICKNAME'])){
                        message.reply('You have some of this permissions (administrator or change nicknames) so I can´t change your nickname\nPlease put [0] on the begining of your name to play creative 1v1')
                    }else{
                    message.member.setNickname('[0] ' + user)
                } 
            }
            ++nl
        }
    }
    if(message.content === '!dr'){
        let role = message.guild.roles.cache.find(role => role.name.startsWith('Lobby'))   
        if(role){
            role.delete()
        }else{
            message.reply('Não existe a role pretendida, por favor tente mais tarde')
        }
    }

    if(message.content === '!gg'){
        let createdLobby = message.guild.channels.cache.find(channel => channel.name === 'lobby-' + (nl-2))
        let user = message.member.displayName
        createdLobby.send('You won!' + user)

        if(user.startsWith('[')){
            let userpoints = user.slice(1, 2)
            let un = user.slice(4, 100)
            userpoints + 10
            message.member.setNickname('[' + userpoints + '] ' + un)
        }else{
            message.reply('You did something wrong, please try again')
        }
        createdLobby.delete()
    
    }
   
})
client.on('messageReactionAdd', async (reaction, user) => {
    

	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
    }
    let rolePT = reaction.message.guild.roles.cache.find(role => role.name === 'PT')
    let roleGB = reaction.message.guild.roles.cache.find(role => role.name === 'ENG')
    let member = reaction.message.guild.members.cache.get(user.id)
    
    if(reaction.emoji.name === '🇵🇹'){
        if(member.roles.cache.some(role => role.name === 'ENG')){
            member.roles.remove(roleGB.id)
            member.roles.add(rolePT.id)
        }else{
        member.roles.add(rolePT.id)
        }
    }
    if(reaction.emoji.name === '🇬🇧'){
        if(member.roles.cache.some(role => role.name === 'PT')){
            member.roles.remove(rolePT.id)
            member.roles.add(roleGB.id)
        }else{
        member.roles.add(roleGB.id)
        }
    }
    
});

client.login(process.env.token) 
