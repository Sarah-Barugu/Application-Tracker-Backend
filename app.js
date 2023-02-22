require('dotenv').config();

//express
const express = require('express');
const app = express();

const jobsRoutes = require('./routes/jobsRoutes')
const authRoutes = require('./routes/authRoutes')
const jobsAppliedRoutes = require('./routes/jobsAppliedRoutes')
const offerRoutes = require('./routes/offerRoute')

//database
const connectDB = require('./dbConfig/connect');
const errorHandlerMiddleware = require('./middlewares/errorHandler')
const notFoundMiddleware = require('./middlewares/notFound')


app.use(express.json());

app.use('/api/v1/jobs', jobsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobsAppliedRoutes)
app.use('/api/v1/offer', offerRoutes)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {console.log(`Server listening on port ${port}...`) })
    } catch (error) {
        console.log(error);
    }
}

start();

