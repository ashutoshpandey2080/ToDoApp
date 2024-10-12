import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId: {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Incomplete"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now
    }
},{timestamps: true});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;