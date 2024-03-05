const { GetAllUsers, GetUser } = require('../utils/MongoUtils')

const createMatchList = async (req, res, next) => {
    
    const connectedUser = await GetUser({email: req.user.email});
    let matchedUsers;

    // Only get appropriate users
    if (connectedUser.orientation !== "A") {
        matchedUsers = await GetAllUsers({gender: connectedUser.orientation}, 10);
    } else {
        matchedUsers = await GetAllUsers({}, 10);
    }

    // Remove connected user
    matchedUsers = matchedUsers.filter((user) => {
        return user !== connectedUser;
    });


    matchedUsers.forEach(user => {
        delete user.password
    });
    res.status(200).send({matches: matchedUsers});
}

module.exports = createMatchList;