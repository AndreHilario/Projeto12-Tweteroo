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

    if (!username || !avatar || typeof username !== "string" || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    newUsersServer.push(newUser);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const { user } = req.headers;

    if (!user|| !tweet || typeof user!== "string" || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const userServer = newUsersServer.find((u) => u.username === user);

    if (!userServer) {
        res.status(401).send("UNAUTHORIZED");
        return;
    }

    const newTweet = { username: user, avatar: userServer.avatar, tweet };
    newTweetsServer.push(newTweet);
    res.status(201).send("OK");

})

app.get("/tweets", (req, res) => {

    if (newTweetsServer.length <= 10) {
        res.send(newTweetsServer);
    } else {
        const numberTen = 10;
        const begin = newTweetsServer.length - numberTen;
        let newArrayTweetsServer = [];

        for (let i = begin; i < newTweetsServer.length; i++) {
            newArrayTweetsServer.push(newTweetsServer[i]);
        }

        res.send(newArrayTweetsServer);
    }

})

app.get("/tweets/:USERNAME", (req, res) => {

    const { USERNAME } = req.params;

    const chooseUser = newTweetsServer.filter((user) => user.username === USERNAME);

    res.send(chooseUser);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Tweeteroo funcionando na porta ${PORT}`));