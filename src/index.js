import express, { text } from "express";

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
app.use(express.json());

// set up routes
// main route
app.get("/", (request, response) => {
    response.status(200).send({
        message: "hello from express",
    });
});

//api routes
// to get all users
// Query Params
app.get("/api/users", (request, response) => {
    console.log(request.query);
    const {
        query: { filter, value },
    } = request;
    if (filter && value) {
        return response.send(mockData.filter((user) => user[filter].includes(value)));
    }
    response.send(mockData);
});

// to get user by id (using request params)
app.get("/api/users/:id", (request, response) => {
    //console.log(request.params);

    const userID = parseInt(request.params.id);
    console.log(userID);
    if (isNaN(userID)) {
        response.status(400).send({
            message: "Bad Request, Invalid user ID",
        });
        return;
    }
    const user = mockData.find((user) => user.id === userID);
    if (!user) return response.status(404).send(`<h3>User with ID ${userID} not found</h3>`);
    response.send(user);
});

// to get list of items
app.get("/api/items", (request, response) => {
    response.send(mockItems);
});

// Post Requests

app.post("/api/users", (request, response) => {
    console.log(request.body);
    const { body } = request;

    const newUser = {
        id: mockData[mockData.length - 1].id + 1,
        ...body,
    };
    mockData.push(newUser);
    return response.status(201).send(newUser);
});

// Put Requests

app.put("/api/users/:id", (request, response) => {
    //console.log(request.body);
    const {
        body,
        params: { id },
    } = request;
    const parsedID = parseInt(id);

    if (isNaN(parsedID)) {
        return response.status(400).send({
            message: "Bad Request, Invalid user ID",
        });
    }
    const findUserIndex = mockData.findIndex((user) => user.id === parsedID);

    if (findUserIndex === -1) {
        return response.status(404);
    }

    mockData[findUserIndex] = { id: parsedID, ...body };
    return response.sendStatus(200);
});

// Patch Requests

app.patch("/api/users/:id", (request, response) => {
    const { body, params } = request;
    const parsedID = parseInt(params.id);

    if (isNaN(parsedID)) {
        return response.status(400).send({
            message: "Bad Request, Invalid user ID",
        });
    }
    const findUserIndex = mockData.findIndex((user) => user.id === parsedID);
    console.log(findUserIndex);

    if (findUserIndex === -1) {
        return response.sendStatus(404);
    }

    mockData[findUserIndex] = { ...mockData[findUserIndex], ...body }; // overwrite the user with the new updated data
    console.log(mockData[findUserIndex]);
    return response.sendStatus(200);
});

// delete Requests
app.delete("/api/users/:id", (request, response) => {
    const {
        params: { id },
    } = request;
    const parsedID = parseInt(id);

    if (isNaN(parsedID)) {
        return response.status(400).send({
            message: "Bad Request, Invalid user ID",
        });
    }
    const findUserIndex = mockData.findIndex((user) => user.id === parsedID);

    if (findUserIndex === -1) {
        return response.sendStatus(404);
    }
    mockData.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

// server listening on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
