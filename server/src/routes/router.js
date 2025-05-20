
import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import questionnaireRouter from "./questionnaireRouter.js";
import gameRouter from "./gameRouter.js";
const router = Router();

router.get("/",(req,res)=>{
    res.send("hola mundo")
})

router.use("/",authRouter);
router.use("/user",userRouter);
router.use("/questionnaire", questionnaireRouter);
router.use("/game",gameRouter);

export default router