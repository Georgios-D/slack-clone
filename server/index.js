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

app.listen(3000, async () => {
    await mongoose.connect(
        "mongodb+srv://GeorgiosD:georgiosd@cluster0.ywdaimb.mongodb.net/?retryWrites=true&w=majority"
    );
});
