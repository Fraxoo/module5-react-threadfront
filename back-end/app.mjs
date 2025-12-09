import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import postRoute from "./routes/postRoute.mjs";
import {Post} from "./models/index.mjs"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use("/post",postRoute)

async function main() {
    try{
        await testDBConnection();
        await sequelize.sync();

        app.listen(process.env.PORT, () => {
            console.log(`Serveur lancé sur le port : ${process.env.PORT}`)
        })

    } catch(err){
        console.error(err)
    }

    // const post1 = await Post.create({
    //    user_id:1,
    //     content:"Ici on fait un Post Test yo yo yo wesh wesh"
    
    // })
    // const post2 = await Post.create({
    //     user_id:2,
    //     content:"ci on fait un Post Test yo yo yo wesh wesh c'est le terter"
    // })
    // const post3 = await Post.create({
    //     user_id:3,
    //     content:"Qui veux se battre avec Meiko wesh"
    // })
}

main();