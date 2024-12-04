import { } from 'dotenv/config'
import express from 'express';
import cors from 'cors'
const app = express();
import authRoute from './router/auth-router.js';
import contactRoute from './router/contact-router.js'
import serviceRoute from './router/service-router.js'
import adminRoute from './router/admin-router.js'
import connectDB from './utils/db.js';
import errorMiddleware from './middlewares/error-middleware.js';
import path from 'path';

// LET TACKLE CORS 

let corsOption = {
    origin: "http://localhost:5173",
    method: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOption));

// deployment directoryname
const _dirname = path.resolve();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use("/api/form", contactRoute);
app.use('/api/data', serviceRoute)

// deployment api
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// let create admin router
app.use('/api/admin', adminRoute)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on this: ${PORT}`)
    })
});
