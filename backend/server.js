import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./database.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://book-store-mern-wno.vercel.app",
  })
);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the book api");
});
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
 });


dotenv.config();
const port = process.env.PORT || 3000;
(async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`app is listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Failed to start the app: ${error}`);
  }
})();

app.use("/books", bookRoute);
