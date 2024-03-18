const { GetUser, GetAllUsers, GetAllGrounds } = require('../utils/MongoUtils');

const createMatchList = async (req, res, next) => {

    const connectedUser = await GetUser({ email: req.user.email });

    const grounds = await GetAllGrounds(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: "like"
        });

    const superGrounds = await GetAllGrounds(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: "superlike"
        });

    const excludedGrounds = await GetAllGrounds(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: {$in: ["dislike", "common"]}
        });

    const likedUsersIDs = grounds.map(ground => ground.receiver).filter(id => !(id.equals(connectedUser._id)));
    const superlikedUsersIDs = superGrounds.map(ground => ground.receiver).filter(id => !(id.equals(connectedUser._id)));

    const interestedUsersIDs = grounds.map(ground => ground.sender).filter(id => !(id.equals(connectedUser._id)));
    const interestedUsers = await GetAllUsers({ _id: { $in: interestedUsersIDs } }, { password: false });

    const superinterestedUsersIDs = superGrounds.map(ground => ground.sender).filter(id => !(id.equals(connectedUser._id)));
    const superinterestedUsers = await GetAllUsers({ _id: { $in: superinterestedUsersIDs } }, { password: false });


    const excludedUsersIDs = [];
    excludedGrounds.forEach(ground => {
       if (!ground.receiver.equals(connectedUser._id)) {
            excludedUsersIDs.push(ground.receiver);
       } else {
           excludedUsersIDs.push(ground.sender);
       }
    });

    const excludedUsersIDsQuery = likedUsersIDs.concat(superlikedUsersIDs, interestedUsersIDs, superinterestedUsersIDs, excludedUsersIDs);
    // Only get appropriate users according to gender and orientation
    let query = {
        "_id": { $not: { $in: excludedUsersIDsQuery } },
        "email": { $not: { $eq: connectedUser.email } },
        "orientation": { $in: ["A", connectedUser.gender] },
        "interests": { $in: connectedUser.interests }
    };
    if (connectedUser.orientation !== "A") {
        query.gender = connectedUser.orientation;
    }

    let matchingUsers = await GetAllUsers(query, { password: false }, 20);

    res.status(200).send({ recommendations: superinterestedUsers.concat(interestedUsers).concat(matchingUsers) });
};

module.exports = createMatchList;