const Todo = require("../models/todo");
const express = require("express");
const multer = require('multer');
const router = express.Router();
const resFormater = require("../utils/responseFormater");

const upload = multer();

//create a todo
router.post('/', async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json();
        }
        const todo = new Todo({ title: req.body.title });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({message:'not found'});
    }
});

//get all todo
router.get('/', async (req, res) => {
    try {
        const id = req.query.id;
console.log("api called");
        if (id) {
            const todo = await Todo.findById(id);

            if (!todo) {
                return res.status(404).json({
                    message: `Todo with id ${id} not found`
                });
            }

            return res.status(200).json(todo);
        } else {
            const todos = await Todo.find();
            return res.status(200).json(todos);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch todos' });
    }
});


//update all todo
router.put("/", upload.none(), async (req, res) => {
    try {
        const id = req.query.id;
        const reqBody = req.body.completed;

        if (!reqBody) return res.status(400).json({ error: "validation error completed status not passed" });
        if (id) {
            const updateTodo = await Todo.findByIdAndUpdate(id,
                { completed: req.body.completed },
                { new: true },
            );
            if (updateTodo) {
                return res.status(200).json({ title: updateTodo.title, id: updateTodo.id, status: updateTodo.completed });
            }
            else {
                return res.status(200).json({ message: `${id} id not found` });
            }
        }
        else {
            return res.status(400).json({ message: "Please input id" });
        }

    }
    catch (error) {
        res.status(404).json(resFormater('',error,null));
    }
});


//delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json(resFormater(' ', "Todo not found", null, null));
        }

        return res.status(200).json(resFormater('', "Successfully deleted", null, deletedTodo));
    } catch (error) {
        return res.status(500).json(resFormater('Server error', "Internal Server Error", error.message, null));
    }
});

module.exports = router;
