const { GetUser, GetAllGrounds, CreateGround} = require('../utils/MongoUtils');

const swipeUser = async (req, res, next) => {
    const swipeStatus = req.body.swipeStatus;
    const swipedUser = req.body.swipedUser;
    console.dir(swipedUser);

    const fetchedGround = await GetAllGrounds(
        {
            $or: [{ sender: req.user._id, receiver: swipedUser._id }, { sender: swipedUser._id,receiver: req.user._id }],
            status: { $not: { $eq: "accepted" } }
        });


    if (!fetchedGround[0]){
        // First swipe
        if (swipeStatus !== "dislike") {
            console.log("Création d'un Ground.");
         await CreateGround({
                sender: req.user._id,
                receiver: swipedUser._id,
                status: swipeStatus
            });
        }
    } else if (fetchedGround[0].sender._id.equals(swipedUser._id)) {
        // Ground commun
        if (swipeStatus !== "dislike") {
            console.log("MATCH! Mise à jour du Ground.");
            // MATCH
        } else {
            console.log("Pas de match. Suppression du ground");
            // DELETE
        }
    } else if (fetchedGround[0].sender.equals(req.user._id)) {
        // L'utilisateur reswipe sur un profile
        if (swipeStatus === "dislike") {
            console.log("Disliké(e) plus tard. Supression du Ground.");
            // DELETE
        }
    }
}


module.exports = swipeUser;