const {TelegramClient, Api} = require("telegram") ;
const {StringSession} = require("telegram/sessions") ;
const input = require("input") ;
const archivedUsers = require("./UserList");
const env = require("dotenv").config();

const apiId = Number(process.env.ApiId) ;
const apiHash = process.env.ApiHash ;
const stringSession = new StringSession(process.env.Session) ;

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
                userId: BigInt(process.env.UserId),
                accessHash: BigInt(process.env.UserHash)
            })
        })).then(user => {
            if (user.messages === undefined || user.messages.length === 0) {
                client.sendMessage(process.env.UserId, {
                    message: "Why'd you clear my history?"
                });
            }
            else {
                console.log("All ok");
            }
        }).catch(err => {
            console.log(err);
        });
    }, 20000);

})() ;
