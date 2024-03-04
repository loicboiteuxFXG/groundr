const { GetAllUsers, GetUser } = require('../utils/MongoUtils')

const createMatchList = async (req, res, next) => {
    
    const connectedUser = await GetUser({email: req.user.email});
    let matchedUsers;

    // Only get appropriate users
    if (connectedUser.orientation === "A") {
        matchedUsers = await GetAllUsers();
    } else {
        matchedUsers = await GetAllUsers({gender: connectedUser.orientation});
    }

    // Remove connected user
    matchedUsers = matchedUsers.splice(matchedUsers.indexOf(connectedUser), 1);




    matchedUsers.forEach(user => {
        delete user.password
    });
    res.status(200).send({matches: matchedUsers});
}

module.exports = createMatchList;