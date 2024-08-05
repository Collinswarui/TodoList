import Todo from "../Models/TodoModel.js";

// Create a Todo
const createTodo = async(req, res) => {
    try {
        const todo = new Todo({
            todo: req.body.todo
        });
    
        todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.log(error)
    }
    
}

// Get todos 
const getTodos = async(req, res) => {
    const todos = await Todo.find();
    res.json(todos);
}


// Delete todo
const deleteTodo = async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
}

// 
const gettodo = async(req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
}

// Update a todo
const updateTodo = async(req, res) => {
    const updatedTodo = await Todo.findById(req.params.id);

    updatedTodo.text = req.body.text;

    updatedTodo.save();
    res.json(updatedTodo);

}

export {
    createTodo,
    getTodos,
    deleteTodo,
    gettodo,
    updateTodo,
}