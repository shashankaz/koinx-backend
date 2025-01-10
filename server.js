import express from "express";
import cron from "node-cron";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { fetchCryptoData } from "./service/fetchCryptoData.js";
import cryptoRoutes from "./routes/crypto.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "API is live!",
  });
});

app.use("/", cryptoRoutes);

cron.schedule("0 */2 * * *", fetchCryptoData);

fetchCryptoData();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
