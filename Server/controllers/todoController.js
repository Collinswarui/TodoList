import Todo from "../Models/TodoModel.js";

// Create a Todo
const createTodo = async (req, res) => {
  try {
    if (!req.body.todo) {
      return res.status(400).json({ message: "Please add todo content" });
    }

    const todo = new Todo({
      todo: req.body.todo,
      createdAt: new Date(), // Ensure the creation date is set
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get todos 
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error deleting todo: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get and toggle completion status of a todo
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.complete = !todo.complete;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.error("Error toggling todo completion: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findById(req.params.id);

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    updatedTodo.todo = req.body.todo; // Ensure the correct field is updated

    await updatedTodo.save();

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createTodo,
  getTodos,
  deleteTodo,
  getTodo,
  updateTodo,
};
