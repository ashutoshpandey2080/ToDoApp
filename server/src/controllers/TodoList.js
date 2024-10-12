import JsonWebTokenError from "jsonwebtoken";
import User from "../models/user.js";
import { statusCodes } from "../utils/constants.js"
import { jsonGenerate } from "../utils/helper.js";

export const TodoList = async (req, res) => {
    try {
        const list = await User.findOne({_id: req.userId})
        .select('-password')
        .populate("Todos")
        .exec();

        return res.send(jsonGenerate(statusCodes.OK, "Todo List", list.Todos));
    } catch (error) {
        res.send(statusCodes.INTERNAL_SERVER_ERROR, "Something went wrong", error);
    }
}