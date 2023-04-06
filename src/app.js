import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const newUsersServer = [];
const newTweetsServer = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;
    const newUser = { username, avatar };

    newUsersServer.push(newUser);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    if(!username) {
        res.status(401).send("UNAUTHORIZED");
    }

    const newTweet = { username, tweet };

    newTweetsServer.push(newTweet);
    res.status(201).send("OK");

})

app.get("/tweets", (req, res) => {

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Tweets funcionando na porta ${PORT}`));