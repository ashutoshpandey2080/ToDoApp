import { validationResult } from "express-validator";
import { statusCodes } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";
import User from "../models/user.js";

export const RemoveTodo = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Validation Error", errors));
    }
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.body.todoId,
            userId: req.userId
        });
        if(todo){
            const user = await User.findOneAndUpdate({_id: req.userId}, {$pull: {Todos: todo._id}});
            if(user){
                return res.send(jsonGenerate(statusCodes.OK, "Todo removed successfully"));
            }
            return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Unable to remove todo"));
        }
        
        return res.send(jsonGenerate(statusCodes.NOT_FOUND, "Todo not found"));
    } catch (error) {
        return res.send(jsonGenerate(statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error));
        
    }
};