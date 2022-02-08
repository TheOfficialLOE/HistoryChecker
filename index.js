const dotenv = require("dotenv").config() ;
const {TelegramClient, Api} = require("telegram") ;
const {StringSession} = require("telegram/sessions") ;
const input = require("input") ;

const apiId = Number(process.env.ApiId) ;
const apiHash = process.env.ApiHash ;
const stringSession = new StringSession(process.env.Session) ;

(async () => {
    console.log('Loading interactive example...') ;
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 }) ;
    await client.start({
        phoneNumber: async () => await input.text("number ?"),
        password: async () => await input.text("password ?"),
        phoneCode: async () => await input.text("Code ?"),
        onError: err => console.log(err)
    }) ;
    console.log('You should now be connected.') ;
    console.log(client.session.save()) ;


    // use this code to get the list of users detected
    const list = await client.getDialogs({archived: true}) ;
    for (const user of list) {
        if (user.entity.className === "User") {
            // console.log(user.title, " + ", user.inputEntity.userId, " + ", user.inputEntity.accessHash)
            }
    }

    await client.invoke(new Api.messages.GetHistory({
        peer: new Api.InputPeerUser({userId: BigInt(process.env.UserId), accessHash: BigInt(process.env.UserHash)})
    })).then(r => {
        if (r.messages === undefined || r.messages.length === 0) {
            setTimeout(async () => {
                await client.sendMessage(process.env.UserId, {message: "Why the hell on earth did you do that?"})
            }, 20000)
        }
        else {
            console.log(r.messages);
        }
    }).catch(err => {
        console.log(parseInt(process.env.UserId), parseInt(process.env.UserHash))
        console.log(err)
    }) ;

})() ;
