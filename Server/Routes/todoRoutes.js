import express from 'express';
import { createTodo, deleteTodo, gettodo, getTodos, updateTodo } from '../controllers/todoController.js';

const router = express.Router();

router.post('/create-todo', createTodo);
router.get('/get-todos', getTodos)
router.delete('/delete-todo', deleteTodo);
router.get('/get-todo/:id', gettodo)
router.put('/update-todo', updateTodo)

export default router;