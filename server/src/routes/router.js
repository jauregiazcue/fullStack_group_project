import { Router } from "express";
import authRouter from "./authRouter.js";
//import questionnaireRouter from "./questionnaireRouter.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("hola mundo")
})

router.use("/",authRouter);
//router.use("/questionnaire", questionnaireRouter);

export default router