import express from 'express';
import mongoose, { Schema } from 'mongoose';
import { creatMongodbConnection } from './utils';
import { TodoModel } from './schema/todo';

const app = express();

app.use(express.json());

app.get(
    '/health',
    async (req, res) => {
        res.json({
            message: 'I am good! I am healthy!'
        })
    }
);

// Add TODO
app.post(
    '/',
    async (req, res) => {
        const body = req.body;

        const todo = await TodoModel.create({
            description: body.description,
            dueDate: new Date(body.dueDate),
            priority: body.priority
        });

        res.json({
            data: todo,
            status: "successful"
        })
    }
);


// Retrieve TODO
app.get(
    '/:id',
    async (req, res) => {
        const id = req.params.id;

        const todo = await TodoModel.findOne({
            _id: id
        });

        res.json({
            data: todo,
            status: "successful"
        })

    }
);

app.delete(
    '/:id',
    async (req, res) => {
        const id = req.params.id;

        const ret = await TodoModel.deleteOne({
            _id: id
        })

        if (ret.deletedCount == 0) {
            res.json({
                status: "failed"
            });

            return;
        }

        res.json({
            status: "successful"
        })
    }
)


app.listen(
    8000,
    async () => {
        await creatMongodbConnection();
        console.log(`Joshua's server is running on http://localhost:8000`);
    }
);