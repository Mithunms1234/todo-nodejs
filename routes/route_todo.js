const express = require("express");
const multer = require('multer');
const router = express.Router();
const todoController = require('../controller/todoController');
const { body, validationResult, query, param } = require("express-validator");

 
const upload = multer();

const validationErrorChecker = async (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//create todos
router.post('/createTodo', upload.none(), [
    body('title').notEmpty().withMessage('Title is required'),
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
],
    validationErrorChecker, todoController.createTodo);

// Get all TODOs
router.get('/getTodo', [
    query('id').optional().isMongoId().withMessage('Invalid id format'),
], validationErrorChecker, todoController.getTodo);

// Update a TODO by ID
router.put('/updateTodo', [
    query('id').notEmpty().isMongoId().withMessage('Invaild id format'),
    query('completed').notEmpty().isBoolean().withMessage('completed is a bool value'),
    query('title').optional().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),

] ,validationErrorChecker,todoController.updateTodo);

// Delete a TODO by ID
router.delete('/deleteTodo/:id',[
    param('id').notEmpty().isMongoId().withMessage('Invaild id format'),
], validationErrorChecker,todoController.deleteTodo);

module.exports = router;
