import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { sequelize, testDBConnection } from "./config/database.mjs";
import postRouter from "./routes/postRoute.mjs";
import userRouter from "./routes/userRoute.mjs";
import commentRouter from "./routes/commentRoute.mjs"
import profileRouter from "./routes/profileRoute.mjs"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/post",postRouter)
app.use("/users", userRouter)
app.use("/comments", commentRouter);
app.use("/profile",profileRouter);

async function main() {
    try {
        await testDBConnection();
        await sequelize.sync();

        app.listen(process.env.PORT, () => {
            console.log(`Serveur lancé sur le port : ${process.env.PORT}`)
        })

    } catch (err) {
        console.error(err)
    }

}

main();