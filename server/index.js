import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

const channelsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 30,
        },
    },
    { timestamps: true }
);

const Channel = mongoose.model("channels", channelsSchema);

app.get("/channels", async (req, res) => {
    const channels = await Channel.find();
    res.send(channels);
});

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
        },
        user: {
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
        },
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "channels",
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);

app.get("/channels/:id", async (req, res) => {
    await Message.insertMany([
        {
            text: "First Message",
            user: {
                name: "John Doe",
                image: "https://avatars.githubusercontent.com/u/25107756?v=4",
            },
            channelId: "64007b739f9f1b9023ecc194",
        },
        {
            text: "Second Message",
            user: {
                name: "John Doe",
                image: "https://avatars.githubusercontent.com/u/25107756?v=4",
            },
            channelId: "64007b739f9f1b9023ecc194",
        },
    ]);
    const messages = await Message.find();
    res.send(messages);
});

app.listen(3000, async () => {
    await mongoose.connect(
        "mongodb+srv://GeorgiosD:georgiosd@cluster0.ywdaimb.mongodb.net/?retryWrites=true&w=majority"
    );
});
