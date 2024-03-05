const { GetAllUsers, GetUser } = require('../utils/MongoUtils')

const createMatchList = async (req, res, next) => {

    const connectedUser = await GetUser({ email: req.user.email });
    let matchedUsers;

    // Only get appropriate users according to gender and orientation
    let query = {
        "email": { $not: {$eq : connectedUser.email} },
        "orientation": { $in: ["A", connectedUser.gender] },
    };
    if (connectedUser.orientation !== "A") {
        query.gender = connectedUser.orientation;
    }

    matchedUsers = await GetAllUsers(query, 15);

    // Remove passwords
    matchedUsers.forEach(user => {
        delete user.password;
    });
    res.status(200).send({ matches: matchedUsers });
}

module.exports = createMatchList;