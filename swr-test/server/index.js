const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
const data = [
    {
        name: "Kim Doe",
        age: 23,
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        name: "Mary Jane",
        age: 25,
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
        name: "Ken Joe",
        age: 24,
        avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    },
    {
        name: "John Doe",
        age: 24,
        avatar: "https://randomuser.me/api/portraits/men/20.jpg"
    }
];

app.get("/", (req, res) => {
    res.json(data);
});

app.listen(3001, () => {
    console.log("App listening on port 3001");
});