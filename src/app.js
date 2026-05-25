import express from "express";
import cors from "cors"
import rewviewRouter from "./route/review.js";
import ratingRouter from "./route/rating.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form
app.use("/uploads", express.static("uploads"));


app.use("/ratings",ratingRouter);
app.use("/", rewviewRouter);
export default app;