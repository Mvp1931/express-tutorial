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
    }
];

const mockItems = [
    {
        id: 1,
        name: "Item 1",
        item: "chicken breast",
    },
    {
        id: 2,
        name: "Item 2",
        item: "apples",
    },
    {
        id: 3,
        name: "Item 3",
        item: "bananas",
    },
    {
        id: 4,
        name: "Item 4",
        item: "oranges",
    },
    {
        id: 5,
        name: "Item 5",
        item: "grapes",
    },
    {
        id: 6,
        name: "Item 6",
        item: "strawberries",
    },
];

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
        query: { filter, value } 
    }  = request;
    if (filter && value) {
        return response.send( mockData.filter((user) => user[filter].includes(value)))
    }  
    response.send(mockData)
});

// to get user by id (using request params)
app.get("/api/users/:id", (request, response) => {
    // console.log(request.params);
    
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

app.post("", (request, response) => {
    
})

// server listening on port 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
