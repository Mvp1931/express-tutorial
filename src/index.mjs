import express, { text } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockData = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@example.com",
    },
    {
        id: 3,
        name: "Bob Smith",
        email: "bobsmith@example.com",
    },
    {
        id: 4,
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
    },
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
];

// set up routes
// main route
app.get('/', (request, response) => {
    response.status(200).send({
        message : "hello from express",
    });
});

//api routes
// to get all users
app.get("/api/users", (request, response) => {
    response.send(mockData);
});

// to get user by id (using request params)
app.get("/api/users/:id", (request, response) => {
    // console.log(request.params);
    const userID = parseInt(request.params.id);
    console.log(userID);
    if (isNaN(userID)) {
        response.status(400)
            .send({
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
