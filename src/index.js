import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import { mockData } from "./utils/data.js";
import routes from "./routes/index.js";
import "./strategies/local-strategy.js";

// start express server
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
    .connect("mongodb://localhost:27017/express_tutorial")
    .then(() => console.log("Connected to mongodb database."))
    .catch((error) => console.error(`Error connecting to mongodb database: ${error}`));

app.use(express.json()); // parses incoming json

app.use(cookieParser("helloExpress")); // parses incoming signed cookies
app.use(
    session({
        secret: "helloExpress",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // cookie will expire in 24 hours
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    }),
); // parses incoming signed cookies

app.use(passport.initialize());
app.use(passport.session());

// NOTE: All middlewares must be declared before their respective routes
// set up middlware logging

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method}, ${request.url}`);
    next();
};
app.use(loggingMiddleware);

// main route
app.get("/", (request, response) => {
    // get session information
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;

    response.cookie("hello", "Express", {
        maxAge: 1000 * 60 * 60, // cookie will expire in 60 minutes
        signed: true, // cookie will be signed
    });
    response.status(201).send({
        message: "hello from express",
    });
});

// set up routes
app.use(routes); // <-- Routes from routes/index.js file

// authentication middleware
app.post("/api/auth", passport.authenticate("local"), (request, response) => {
    console.log(request.session);
    response.sendStatus(200).send(request.session.user);
});

app.get("/api/auth/status", (request, response) => {
    console.log(request.sessionID);

    return request.user
        ? response.send(request.user)
        : response.status(401).send({ message: "Not Logged In, Wrone Credentials..." });
});

app.post("/api/auth/logout", (request, response) => {
    if (!request.user) return response.status(401).send({ message: "User Not logged in..." });
    request.logOut((error) => {
        if (error) return response.status(400).send({ message: "Error Logging Out..." });
        return response.sendStatus(200);
    });
});

app.post("/api/cart", (request, response) => {
    if (!request.session.user) {
        return response.status(401).send({ message: "Not an Authenticated User!" });
    }
    const { body: item } = request;
    const { cart } = request.session;

    if (cart) cart.push(item);
    else request.session.cart = [item];

    return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
    if (!request.session.user) {
        return response.status(401).send({ message: "Not an Authenticated User!" });
    }
    const { cart } = request.session;
    return response.status(200).send(cart ?? []);
});

// to get list of items
// server listening on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
