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
    isComplete: {
        type: Boolean,
        required: true,
        default: false
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