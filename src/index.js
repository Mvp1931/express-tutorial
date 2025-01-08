import express, { text } from "express";
import { getUserValidationSchema, createUserValidataonSchema } from "./utils/validationSchema.js";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";

const app = express();

const PORT = process.env.PORT || 3000;

const mockData = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        displayName: "John",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@example.com",
        displayName: "Jane",
    },
    {
        id: 3,
        name: "Bob Smith",
        email: "bobsmith@example.com",
        displayName: "Bob",
    },
    {
        id: 4,
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        displayName: "Alice",
    },
    {
        id: 5,
        name: "Charlie Brown",
        email: "charliebrown@example.com",
        displayName: "Charlie",
    },
    {
        id: 6,
        name: "Dave Jones",
        email: "davejones@example.com",
        displayName: "Dave",
    },
    {
        id: 7,
        name: "Anson Carter",
        email: "ansoncarter@example.com",
        displayName: "Anson",
    },
];

const mockItems = [
    {
        id: 1,
        name: "Item 1",
        item: "chicken breast",
        price: 12.99,
    },
    {
        id: 2,
        name: "Item 2",
        item: "apples",
        price: 2.99,
    },
    {
        id: 3,
        name: "Item 3",
        item: "bananas",
        price: 1.99,
    },
    {
        id: 4,
        name: "Item 4",
        item: "oranges",
        price: 3.99,
    },
    {
        id: 5,
        name: "Item 5",
        item: "grapes",
        price: 7.99,
    },
    {
        id: 6,
        name: "Item 6",
        item: "strawberries",
        price: 8.99,
    },
];

// set up middleware
app.use(express.json()); // parses incoming json

// NOTE: All middlewares must be declared before their respective routes
// logging middleware
const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method}, ${request.url}`);
    next();
};

// resolve users by ID middleware

const resolveIndexByUserID = (request, response, next) => {
    const { params } = request;
    const parsedID = parseInt(params.id);

    if (isNaN(parsedID)) {
        return response.status(400).send({
            message: "Bad Request, Invalid user ID",
        });
    }
    const findUserIndex = mockData.findIndex((user) => user.id === parsedID);

    if (findUserIndex === -1) {
        return response.sendStatus(404);
    }

    request.findUserIndex = findUserIndex;
    next();
};

// set up routes
// main route
app.get(
    "/",
    (request, response, next) => {
        console.log(`Logging middleware at \\ `);
        next();
    },
    (request, response) => {
        response.status(200).send({
            message: "hello from express",
        });
    },
);

// to get list of items
app.get("/api/items", (request, response) => {
    response.send(mockItems);
});

app.use(loggingMiddleware);
//api routes
// to get all users
// Query Params
app.get("/api/users", checkSchema(getUserValidationSchema), (request, response) => {
    const result = validationResult(request);
    console.log(result);

    const {
        query: { filter, value },
    } = request;
    if (filter && value) {
        return response.send(mockData.filter((user) => user[filter].includes(value)));
    }
    response.send(mockData);
});

// to get user by id (using request params)

app.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { findUserIndex } = request;
    const user = mockData[findUserIndex];
    if (!user) return response.status(404).send(`<h3>User with ID ${user.id} not found</h3>`);
    response.send(user);
});

// Post Requests

app.post("/api/users", checkSchema(createUserValidataonSchema), (request, response) => {
    const result = validationResult(request);
    console.log(result);

    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() });
    }

    const data = matchedData(request);

    const newUser = {
        id: mockData[mockData.length - 1].id + 1,
        ...data,
    };

    mockData.push(newUser);
    return response.status(201).send(newUser);
});

// Put Requests

app.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex } = request;
    mockData[findUserIndex] = { id: mockData[findUserIndex].id, ...body };
    return response.sendStatus(200);
});

// Patch Requests

app.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex } = request;
    mockData[findUserIndex] = { ...mockData[findUserIndex], ...body }; // overwrite the user with the new updated data
    return response.sendStatus(200);
});

// delete Requests
app.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { findUserIndex } = request;
    mockData.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

// server listening on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
