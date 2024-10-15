import { statusCodes } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";  // Assuming 'Todo' is the model for Todos
import { validationResult } from "express-validator";

export const MarkTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Validation Error", errors));
    }
    try {
        // Fetch the todo item by its ID and user ID
        const todo = await Todo.findOne({
            _id: req.body.todoId,
            userId: req.userId
        });

        // Check if the todo item exists
        if (!todo) {
            return res.send(jsonGenerate(statusCodes.NOT_FOUND, "Todo not found"));
        }

        // Toggle the isComplete field
        todo.isComplete = !todo.isComplete;

        // Save the updated todo
        const result = await todo.save();

        if(result){
            return res.send(jsonGenerate(statusCodes.OK, "Todo Updated", todo))
        }
        return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Unable to update todo"));

    } catch (error) {
        return res.send(jsonGenerate(statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error));
    }
};
