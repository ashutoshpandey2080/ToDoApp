import { statusCodes } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";  // Assuming 'Todo' is the model for Todos

export const MarkTodo = async (req, res) => {
    try {
        // Find the Todo by userId and todoId
        const todo = await Todo.findOne({ userId: req.userId, _id: req.body.todoId });

        // Check if the Todo exists
        if (!todo) {
            return res.send(jsonGenerate(statusCodes.NOT_FOUND, "Todo not found"));
        }

        // Toggle the status between 'Incomplete' and 'Complete'
        todo.status = todo.status === "Incomplete" ? "Complete" : "Incomplete";

        // Save the updated Todo
        await todo.save();

        return res.send(jsonGenerate(statusCodes.OK, `Todo marked as ${todo.status}`));
    } catch (error) {
        console.error("Error in MarkTodo:", error);  // Log the error for debugging
        return res.send(jsonGenerate(statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error));
    }
};
