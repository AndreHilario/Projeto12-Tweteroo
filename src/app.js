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

    if(!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    newUsersServer.push(newUser);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    if(!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    const user = newUsersServer.find((u) => u.username === username);

    if (!user) {
      res.status(401).send("UNAUTHORIZED");
      return;
    }
  
    const newTweet = { username, avatar: user.avatar, tweet };
    newTweetsServer.push(newTweet);
    res.status(201).send("OK");

})

app.get("/tweets", (req, res) => {

    if(newTweetsServer.length <= 10) {
        res.send(newTweetsServer);
    } else {
        const begin = newTweetsServer.length - 10;
        let newArrayTweetsServer = [];
        for(let i = begin; i < newTweetsServer.length; i++){
            newArrayTweetsServer.push(newTweetsServer[i]);
            console.log(newArrayTweetsServer)
        }

        res.send(newArrayTweetsServer);
    }

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Tweeteroo funcionando na porta ${PORT}`));