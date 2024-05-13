const Ground = require("../models/ground");
const Conversation = require("../models/conversation")

const swipeUser = async (req, res, next) => {
    const swipeStatus = req.body.swipeStatus;
    const swipedUser = req.body.swipedUser;
    const userId = req.user._id

    const fetchedGroundsList = await Ground.find({
        $or: [
            { sender: req.user._id, receiver: swipedUser._id },
            { sender:swipedUser._id, receiver: req.user._id }],
        status: { $not: { $eq: "accepted" } }
    });


    const fetchedGround = fetchedGroundsList[0];
    if (!fetchedGround) {
        // First swipe
        console.log("Création d'un Ground.");
        const newGround = new Ground({sender: req.user._id, receiver: swipedUser._id, status: swipeStatus})
        await newGround.save()
        res.send({action: "create", match: false});
    } else if (fetchedGround.sender.equals(swipedUser._id)) {
        // Ground commun
        if (swipeStatus !== "dislike") {
            // MATCH
            console.log("MATCH! Mise à jour du Ground.");
            await Ground.findByIdAndUpdate(fetchedGround._id, { status: "common" });
            const conversation = new Conversation({
                participants : [userId, swipedUser._id]
            })
            await conversation.save()
            res.send({action: "update", match: true, user: swipedUser, conversation: conversation});
        } else {
            // DELETE
            console.log("Pas de match. Suppression du ground");
            await Ground.findByIdAndDelete(fetchedGround._id);
            res.send({action: "delete", match: false});
        }
    } else if (fetchedGround.sender.equals(req.user._id)) {
        // L'utilisateur reswipe sur un profile
        console.log("Ground déjà existant");
        if (swipeStatus === "dislike") {
            // DELETE
            console.log("Disliké(e) plus tard. Supression du Ground.");
            await Ground.findByIdAndDelete(fetchedGround._id);
            res.send({action: "delete", match: false});
        } else {
            res.send({action: "none", match: false});
        }
    }
};


module.exports = swipeUser;