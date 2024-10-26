import mongoose from 'mongoose';
const { Schema } = mongoose;

const TodoSchema = new Schema({
    description: String,
    dueDate: Date,
    priority: String
});

export const TodoModel = mongoose.model('todo', TodoSchema);