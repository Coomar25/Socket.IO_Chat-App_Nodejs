import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectToMongoDb } from "./config/dbConnect.js";
import { userRouter } from "./routes/userRouter.js";

// Port Specify Gareko
dotenv.config();
const PORT = process.env.PORT;

// Express lai initialize gareko
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Server listen gareko
app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.use("/api/user/", userRouter);

connectToMongoDb();
