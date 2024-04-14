const User = require("../models/user");
const Ground = require("../models/ground");

const createMatchList = async (req, res, next) => {

    const connectedUser = await User.findOne({_id : req.user._id});
    console.dir(connectedUser)
    const grounds = await User.find({
        $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
        status: "like"
    })
    const superGrounds = await Ground.find(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: "superlike"
        });

    const excludedGrounds = await Ground.find(
        {
            $or: [{ sender: connectedUser._id }, { receiver: connectedUser._id }],
            status: {$in: ["dislike", "common"]}
        });

    const likedUsersIDs = grounds.map(ground => ground.receiver).filter(id => !(id.equals(connectedUser._id)));
    const superlikedUsersIDs = superGrounds.map(ground => ground.receiver).filter(id => !(id.equals(connectedUser._id)));

    const interestedUsersIDs = grounds.map(ground => ground.sender).filter(id => !(id.equals(connectedUser._id)));
    const interestedUsers = await User.find({ _id: { $in: interestedUsersIDs } }, { password: false });

    const superinterestedUsersIDs = superGrounds.map(ground => ground.sender).filter(id => !(id.equals(connectedUser._id)));
    const superinterestedUsers = await User.find({ _id: { $in: superinterestedUsersIDs } }, { password: false });


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
        "interests": {$in: connectedUser.interests },
        location:
            { $near:
                    {
                        $geometry: { type: "Point",  coordinates: connectedUser.location.coordinates },
                        $minDistance: 0,
                        $maxDistance: (connectedUser.range * 1000)
                    }
            }
    };
    if (connectedUser.orientation !== "A") {
        query.gender = connectedUser.orientation;
    }

    let matchingUsers = await User.find(query, { password: false }).limit(20);

    res.status(200).send({ recommendations: superinterestedUsers.concat(interestedUsers).concat(matchingUsers) });
};

module.exports = createMatchList;