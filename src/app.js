require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundMiddleware = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/error');
const rateLimitMiddleware = require('./middlewares/rate-limit');
const authRoute = require('./routes/auth-route');
const userRoute = require('./routes/user-route');
const roomRoute = require('./routes/room-route');
const bookRoute = require('./routes/book-route')

const app = express();

app.use(cors());
app.use(rateLimitMiddleware);
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.use('/room', roomRoute);
app.use("/book", bookRoute)

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));