import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/log", (req, res) => {
  const log = {
    timestamp: new Date().toISOString(),
    urlChecked: req.body.url,
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"]
  };

  fs.appendFileSync("logs.json", JSON.stringify(log) + ",\n");

  res.json({ status: "logged" });
});

app.listen(3001, () => console.log("Logger running on port 3001"));
