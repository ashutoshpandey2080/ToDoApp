import { check } from "express-validator";

const TodoSchema = [
    check('title')
        .exists()
        .withMessage('Title is required')
        .isLength({ min: 1 })
        .withMessage('Title must be at least 1 character long'),
    check('description')
        .exists()
        .withMessage('Description is required')
        .isLength({min : 1})
        .withMessage('Description must be at least 1 character long'),
]

export default TodoSchema;