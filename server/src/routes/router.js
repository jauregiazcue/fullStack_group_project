import { Router } from "express";

const router = Router();

router.get("/",(req,res)=>{
    res.send("hola mundo")
})

router.use("/",authRouter);
router.use("/questionnaire", questionnaireRouter);

export default router