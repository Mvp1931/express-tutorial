import express from "express";

import routes from "./routes/index.js";

// start express server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parses incoming json

// NOTE: All middlewares must be declared before their respective routes
// set up middlware logging

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method}, ${request.url}`);
    next();
};
app.use(loggingMiddleware);

// main route
app.get("/", (request, response) => {
    response.status(200).send({
        message: "hello from express",
    });
});

// set up routes
app.use(routes);

// to get list of items
// server listening on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
