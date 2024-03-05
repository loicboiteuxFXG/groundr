const { GetUser, GetAllUsers, GetAllGrounds } = require('../utils/MongoUtils')

const createMatchList = async (req, res, next) => {

    const connectedUser = await GetUser({ email: req.user.email });

    const grounds = await GetAllGrounds(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: { $not: { $eq: "accepted" } }
        });

    const likedUsersIDs = grounds.map(ground => ground.receiver).filter(id => !(id.equals(connectedUser._id)));

    const interestedUsersIDs = grounds.map(x => x.sender).filter(id => !(id.equals(connectedUser._id)));
    const interestedUsers = await GetAllUsers({ _id: { $in: interestedUsersIDs } });

    console.log(interestedUsers)

    const excludedUsersIDs = likedUsersIDs.concat(interestedUsersIDs);
    // Only get appropriate users according to gender and orientation
    let query = {
        "_id": { $not: { $in: excludedUsersIDs } },
        "email": { $not: { $eq: connectedUser.email } },
        "orientation": { $in: ["A", connectedUser.gender] },
        "interests": { $in: connectedUser.interests }
    };
    if (connectedUser.orientation !== "A") {
        query.gender = connectedUser.orientation;
    }

    let matchingUsers = await GetAllUsers(query, { password: false }, 20);

    res.status(200).send({ recommendations: interestedUsers.concat(matchingUsers) });
}

module.exports = createMatchList;