import userController from "./userController.js";


async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const result = await userController.getUserById(id);
        res.json(result);

    } catch (error) {

        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }

    }
}

async function getUserWins(req, res) {
    try {
        const id = req.params.id;
        const result = await userController.getUserWins(id);
        res.json(result);

    } catch (error) {

        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }

    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const result = await userController.deleteUser(id);
        res.json(result);

    } catch (error) {

        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }

    }
}

export default {
    getUserWins,
    getUserById
}