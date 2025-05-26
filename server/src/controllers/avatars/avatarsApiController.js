import avatarsController from "./avatarsController.js";

function getAvatars(req, res) {
    res.send(avatarsController.getAvatars());
}

function getAvatarById(req, res) {
    const id = parseInt(req.params.id);
    res.send(avatarsController.getAvatarById(id));
}

export default {
    getAvatars,
    getAvatarById
}