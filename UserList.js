module.exports = async client => {
    const chatList = await client.getDialogs({
        archived: true
    });
    const detectedUsers = []
    for (const user of chatList) {
        if (user.entity.className === "User") {
            detectedUsers.push({
               title: user.title,
               id: user.inputEntity.userId,
               accessHash: user.inputEntity.accessHash
            });
        }
    }
    return detectedUsers;
};