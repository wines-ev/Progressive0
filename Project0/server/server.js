import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRouter from './routers/userRouter.js';
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
    

app.use('/api/v1/auth', authRouter);

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


