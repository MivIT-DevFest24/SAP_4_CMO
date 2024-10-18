import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";

import connectDB from "./configs/dbConnection.js";
import corsOptions from "./configs/corsOptions.js";
import routes from "./routes/index.js";

const app = express();
dotenv.config();

// parse requests of content-type - multipart/form-data for file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors(corsOptions));

app.use("/api", routes);

app.get("/", (_, res) => {
  res.send("Welcome to User Management Service...");
});

const PORT = process.env.PORT || 5006;

await connectDB(); // connect to the database

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, http://localhost:${PORT}`);
}); // start the server
