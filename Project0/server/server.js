import express from 'express';
import 'dotenv/config';
import  userRouter from './routers/userRouter.js';

const app = express();
const PORT = 8000;


app.use(express.json());

app.use('/api/v1/users', userRouter);


app.use("/test", (req, res) => {
    res.status(200).json({ message: 'Hello World' });
})

app.use('/', (req, res) => {
    res.status(200).json({ message: 'Page not found' });
})


app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})


