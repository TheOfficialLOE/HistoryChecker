# History Checker

Since Telegram added this feature to allow users to remove messages and history  from both sides, made it easier for other people to invade our privacy, by using this script you can track the ones who remove your history.

**Usage**:
<br/>
Create `config.js` in the root directory with the following schema:

`{
apiId,
apiHash,
stringSession,
userId,
userHash,
messageText.
checkTime
}`

Then paste your credentials and target information.

**Notice**: `checkTime` field indicates the interval.
