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
});

app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const { user } = req.headers;

    if (!user || !tweet || typeof user !== "string" || typeof tweet !== "string") {
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

});

app.get("/tweets", (req, res) => {
    const { page } = req.query;
  
    if (page && !Number.isInteger(Number(page)) || Number(page) < 1) {
      return res.status(400).send("Informe uma página válida!");
    }
  
    const tweetsPerPage = 10;
  
    const firstTweetIndex = (page ? Number(page) - 1 : 0) * tweetsPerPage;
  
    const lastTweetIndex = firstTweetIndex + tweetsPerPage - 1;
  
    const currentPage = newTweetsServer.slice(firstTweetIndex, lastTweetIndex + 1);
  
    res.send(currentPage);
  });

app.get("/tweets/:USERNAME", (req, res) => {

    const { USERNAME } = req.params;

    const chooseUser = newTweetsServer.filter((user) => user.username === USERNAME);

    res.send(chooseUser);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Tweeteroo funcionando na porta ${PORT}`));