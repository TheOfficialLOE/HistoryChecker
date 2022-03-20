const {TelegramClient, Api} = require("telegram") ;
const {StringSession} = require("telegram/sessions") ;
const input = require("input") ;
const archivedUsers = require("./user_list");
const config = require("./config");

const apiId = config.apiId ;
const apiHash = config.apiHash ;
const stringSession = new StringSession(config.stringSession) ;

(async () => {
    console.log('Loading interactive example...') ;
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 }) ;
    await client.start({
        phoneNumber: async () => await input.text("Please Enter Your Phone Number:"),
        password: async () => await input.text("Please Enter Your Password"),
        phoneCode: async () => await input.text("Please Enter The Received Code:"),
        onError: err => console.log(err)
    }) ;
    console.log('You should now be connected.') ;
    console.log(client.session.save()) ;


    // use this part to get the list of detected archived users
    // const users = await archivedUsers(client);
    // console.log(users);

    setTimeout(async () => {
        await client.invoke(new Api.messages.GetHistory({
            peer: new Api.InputPeerUser({
                userId: config.userId,
                accessHash: config.userHash
            })
        })).then(user => {
            if (user.messages === undefined || user.messages.length === 0) {
                client.sendMessage(config.userId, {
                    message: config.messageText
                });
            }
            else {
                console.log("All ok");
            }
        }).catch(err => {
            console.log(err);
        });
    }, config.checkTime);

})() ;
