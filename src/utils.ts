import mongoose from 'mongoose';

export const creatMongodbConnection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27888/todo-db');
    const status = mongoose.connection.readyState;

    if (status == 1) {
        console.log("Database Connected")
    } else {
        throw new Error("Database Not Connected!")
    }
}