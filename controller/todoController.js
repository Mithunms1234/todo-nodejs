
const Todo = require("../models/todo");

//create a todo
exports.createTodo = (async (req, res) => {
    try {
        const todo = new Todo({ title: req.body.title });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//get all todo
exports.getTodo = (async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const todo = await Todo.findById(id);
            if (todo) { return res.status(200).json(todo); }
            else { return res.status(200).json({ message: `'${id}' No details available` }) }
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
exports.updateTodo = (async (req, res) => {
    try {
        const id = req.query.id;
        const completed = req.query.completed;
        const title = req.query.title;

        const reqTodo = { completed: completed };
        if (title !== undefined) reqTodo.title = title;

        const resTodo = await Todo.findByIdAndUpdate(id, reqTodo, { new: true });

        if (resTodo) {
            return res.status(200).json({
                message: `${resTodo.title || 'TODO'} is marked as ${resTodo.completed ? 'Completed' : 'Pending'}`,
                data: { title: resTodo.title, id: resTodo.id, status: resTodo.completed }
            });
        }
        else {
            return res.status(200).json({ message: `No Todo with this id-${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});


//delete a todo
exports.deleteTodo = (async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        return res.status(500).json({ error });
    }
});
