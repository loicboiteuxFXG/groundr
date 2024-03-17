const { GetUser, GetAllGrounds, CreateGround, UpdateGround, DeleteGround} = require('../utils/MongoUtils');
const {ObjectId} = require("mongodb");

const swipeUser = async (req, res, next) => {
    const swipeStatus = req.body.swipeStatus;
    const swipedUser = req.body.swipedUser;

    const fetchedGroundsList = await GetAllGrounds(
        {
            $or: [
                {sender: new ObjectId(req.user._id), receiver: new ObjectId(swipedUser._id)},
                {sender: new ObjectId(swipedUser._id), receiver: new ObjectId(req.user._id)}],
            status: {$not: {$eq: "accepted"}}
        });


    const fetchedGround = fetchedGroundsList[0];
    if (!fetchedGround)
    {
        // First swipe
        if (swipeStatus !== "dislike") {
            console.log("Création d'un Ground.");
            await CreateGround(req.user._id, swipedUser._id, swipeStatus);
            res.send("Création d'un Ground");
        }
    } else if (fetchedGround.sender.equals(swipedUser._id)) {
        // Ground commun
        if (swipeStatus !== "dislike") {
            // MATCH
            console.log("MATCH! Mise à jour du Ground.");
            await UpdateGround(fetchedGround._id, {status: "common"});
            res.send("MATCH! Mise à jour du Ground.");
        } else {
            // DELETE
            console.log("Pas de match. Suppression du ground");
            await DeleteGround(fetchedGround._id);
            res.send("Pas de match. Suppression du ground");

        }
    } else if (fetchedGround.sender.equals(req.user._id)) {
        // L'utilisateur reswipe sur un profile
        console.log("Ground déjà existant")
        if (swipeStatus === "dislike") {
            // DELETE
            console.log("Disliké(e) plus tard. Supression du Ground.");
            await DeleteGround(fetchedGround._id);
            res.send("Disliké(e) plus tard. Supression du Ground.");
        }
    }
}


module.exports = swipeUser;