import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import init from "./db/connection.js";
import authRouter from "./routers/authRouter.js";
import uR from "./routers/userRouter.js";
import hR from "./routers/hospitalRouter.js";
import rR from "./routers/receiverRouter.js";
import dr from "./routers/donorRouter.js";


// express config
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Go To /api");
});

// base router
const bR = express.Router();
app.use("/api", bR);

bR.get("/", (req, res) => {
  res.send("v0.0.1");
});

// Routes /api/{route}
bR.use("/auth", authRouter);
bR.use("/user", uR);
bR.use("/hospital", hR);
bR.use("/receiver", rR);
bR.use("/donor", dr);

const API_KEY = process.env.DAILY_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = async (room) => {
  try {
    const res = await fetch(`https://api.daily.co/v1/rooms/${room}`, {
      method: "GET",
      headers,
    })
    const json = await res.json()
    return json
  } catch (err) {
    return console.error("error:" + err)
  }
};

const createRoom = async (room) => {
  try {
    const res = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: room,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: true,
          start_audio_off: false,
          lang: "en",
        },
      }),
    })
    const json = await res.json()
    return json
  } catch (err) {
    return console.log("error:" + err)
  }
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});


// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.clear()
  init()
  console.log(`Server @ http://localhost:${PORT}`);
});

export default app;
