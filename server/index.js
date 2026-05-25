const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");

const app = express();

dotenv.config();

const port = process.env.PORT || 6767;
const database = process.env.DATABASE;

// middleware
app.use(express.json());
app.use(cors());

// insert a certain task
app.post("/tasks", async (req, res) => {
    try {
        const { task } = req.body;
        const query = await pool.query("insert into tasks (task) values ($1) returning *", [task]);
        const tasks = query.rows[0];
        res.status(201);
        res.json(tasks);
    } catch(e) {
        res.status(500);
        console.log(e.message);
    }
});

// get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const query = await pool.query("select * from tasks");
        const tasks = query.rows;
        res.status(201);
        res.json(tasks);
        console.log("Got all tasks.");
    } catch(e) {
        res.status(500);
        console.log(e.message);
    }
});

// delete a certain task by id
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = await pool.query("delete from tasks where id = $1", [id]);
        res.status(201);
        const task = 
        res.json(query);
        console.log(`Deleted task with id ${id}.`);
    } catch(e) {
        res.status(500);
        console.log(e.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
    // check if connected to database
    pool.query("select now()", (err, res) => {
        if(err) {
            console.log(`Could not connect to database ${database}.`);
        } else {
            console.log(`Connected to database ${database}.`);
        }
    });
});