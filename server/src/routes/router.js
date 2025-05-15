
import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import questionnaireRouter from "./questionnaireRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("hola mundo")
})

router.use("/questionnaire", questionnaireRouter);
router.use("/",authRouter);
router.use("/user",userRouter);

export default router