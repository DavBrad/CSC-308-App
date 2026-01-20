// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }, 
    {
      "id": "qwe123",
      "job": "Zookeeper",
      "name": "Cindy"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUsers = (name, job) => {
  return users["users_list"].filter((user) => {
    const nameMatch = name === undefined || user["name"] === name;
    const jobMatch = job === undefined || user["job"] === job;
    return nameMatch && jobMatch;
  });
}

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserByID = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
  return users["users_list"];
}


app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    deleteUserByID(id);
    res.send();
  }
});
  
  

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send();
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  if (name != undefined || job != undefined) {
    let result = findUsers(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/", (req, res) => {
  res.send("Hello Worlds, hello! hi");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );

});