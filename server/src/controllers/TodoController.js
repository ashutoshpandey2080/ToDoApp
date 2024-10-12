import { validationResult } from "express-validator";
import { statusCodes } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";
import User from "../models/user.js";

export const CreateTodo = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const todo = new Todo({
                userId : req.userId,
                title : req.body.title,
                description: req.body.description,
                deadline: req.body.deadline
            })
            console.log(todo);
            const result = await todo.save();
            if(result){
                const user = await User.findOneAndUpdate({_id: req.userId}, {$push: {Todos: result._id}});
                return res.send(jsonGenerate(statusCodes.OK, "Todo Created Successfully", result));
            }
        } catch (error) {
            return res.send(jsonGenerate(statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong"));
        }
    }
    return res.send(jsonGenerate(statusCodes.BAD_REQUEST, "Fields are manadatory", errors));
}