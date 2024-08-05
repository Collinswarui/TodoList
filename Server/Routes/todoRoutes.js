import express from 'express';
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todoController.js';

const router = express.Router();

router.post('/create-todo', createTodo);
router.get('/get-todos', getTodos)
router.delete('/delete-todo/:id', deleteTodo);
router.get('/get-todo/:id', getTodo)
router.put('/update-todo', updateTodo)

export default router;