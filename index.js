import express from "express";
import initApp from "./src/modules/app.router.js";
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = 4000;

initApp(app, express);


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});