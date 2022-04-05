const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const users = {
    users_list: [{
            id: "xyz789",
            name: "Charlie",
            job: "Janitor",
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer",
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor",
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress",
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender",
        },
    ],
};

//get users by name
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] === name);
};

//get users by id
app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result == undefined || result.length == 0)
        res.status(404).send("Resource not found.");
    else {
        result = { users_list: result };
        res.send(result);
    }
});

function findUserById(id) {
    return users["users_list"].find((user) => user["id"] === id);
}

//post
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user) {
    users["users_list"].push(user);
}

//delete
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = users["users_list"].find((user) => user["id"] === id);
    if (result == undefined || result.length == 0)
        return res.status(404).send("Resource not found.");
    else {
        const index = users["users_list"].indexOf(result);
        users["users_list"].splice(index, 1);
        res.status(200).end();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});