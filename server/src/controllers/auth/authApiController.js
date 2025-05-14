import { createToken } from "../../utils/token.js";
import authController from "./authController.js";

async function register(req, res) {
    try {

        const result = await authController.register(req.body);
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
async function login(req, res) {
    try {
        console.log(req)
        const { email, password } = req.body;
        const user = await authController.login(email, password);

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const payload = {
            _id:user._id,
        };

        const token = createToken(payload);
        res.json({ result,token });

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
    register,
    login
}