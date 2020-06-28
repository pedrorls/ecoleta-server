import path from "path";
import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

console.log("Listening on port: 3333");
app.listen(3333);
