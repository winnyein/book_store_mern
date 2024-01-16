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
