import connectDB from "../../DB/connection.js";
import messageRouter from "./message/message.router.js"
import authRouter from "./auth/auth.router.js"
import userRouter from "./user/user.router.js"

import cors from 'cors';





const initApp =(app, express)=>
{
    app.use(express.json());
    app.use(cors());
    connectDB();
    app.use("/message", messageRouter);
    app.use("/auth", authRouter);
    app.use("/user", userRouter); 
};


export default initApp;