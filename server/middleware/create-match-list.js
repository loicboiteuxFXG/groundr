const User = require("../models/user");
const Ground = require("../models/ground");

const createMatchList = async (req, res, next) => {

    try {
        const authUser = await User.findOne({_id : req.user._id})

        if (!authUser) {
            const error = new Error("L'utilisateur n'existe pas")
            error.statusCode = 404
            throw error
        }

        const grounds = await Ground.find({
            $or: [{ sender: authUser._id }, { receiver: authUser._id }],
            status: "like"
        })
        console.log(grounds)
        const superGrounds = await Ground.find(
            {
                $or: [{ sender: authUser._id }, { receiver: authUser._id }],
                status: "superlike"
            })

        const excludedGrounds = await Ground.find(
            {
                $or: [{ sender: authUser._id }, { receiver: authUser._id }],
                status: {$in: ["dislike", "common"]}
            })

        const likedUsersIDs = grounds.map(ground => ground.receiver).filter(id => !(id.equals(authUser._id)));
        const superlikedUsersIDs = superGrounds.map(ground => ground.receiver).filter(id => !(id.equals(authUser._id)));

        const interestedUsersIDs = grounds.map(ground => ground.sender).filter(id => !(id.equals(authUser._id)));
        const interestedUsers = await User.find({ _id: { $in: interestedUsersIDs } }, { password: false });

        const superinterestedUsersIDs = superGrounds.map(ground => ground.sender).filter(id => !(id.equals(authUser._id)));
        const superinterestedUsers = await User.find({ _id: { $in: superinterestedUsersIDs } }, { password: false });


        const excludedUsersIDs = [];
        excludedGrounds.forEach(ground => {
            if (!ground.receiver.equals(authUser._id)) {
                excludedUsersIDs.push(ground.receiver);
            } else {
                excludedUsersIDs.push(ground.sender);
            }
        });

        const excludedUsersIDsQuery = likedUsersIDs.concat(superlikedUsersIDs, interestedUsersIDs, superinterestedUsersIDs, excludedUsersIDs);
        console.log(excludedUsersIDsQuery)

        // Only get appropriate users according to gender and orientation
        let query = {
            "_id": { $not: { $in: excludedUsersIDsQuery } },
            "email": { $not: { $eq: authUser.email } },
            "orientation": { $in: ["A", authUser.gender] },
            "interests": {$in: authUser.interests },
            location:
                { $near:
                        {
                            $geometry: { type: "Point",  coordinates: authUser.location.coordinates },
                            $minDistance: 0,
                            $maxDistance: (authUser.range * 1000)
                        }
                }
        };
        if (authUser.orientation !== "A") {
            query.gender = authUser.orientation;
        }

        let matchingUsers = await User.find(query, { password: false }).limit(20);

        res.status(200).send({ recommendations: superinterestedUsers.concat(interestedUsers).concat(matchingUsers) })
    } catch (err) {
        next(err)
    }
};

module.exports = createMatchList