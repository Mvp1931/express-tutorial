import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";

import { mockData } from "../utils/data.js";
import { resolveIndexByUserID } from "../utils/middleware.js";
import { getUserValidationSchema, createUserValidataonSchema } from "../utils/validationSchema.js";

const usersRouter = Router();

//get request
usersRouter.get("/api/users", checkSchema(getUserValidationSchema), (request, response) => {
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

//get user by id
usersRouter.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { findUserIndex } = request;
    const user = mockData[findUserIndex];
    if (!user) return response.status(404).send(`<h3>User with ID ${user.id} not found</h3>`);
    response.send(user);
});

//post request
usersRouter.post("/api/users", checkSchema(createUserValidataonSchema), (request, response) => {
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

// Put Request

usersRouter.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex } = request;
    mockData[findUserIndex] = { id: mockData[findUserIndex].id, ...body };
    return response.sendStatus(200);
});

// Patch Request

usersRouter.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex } = request;
    mockData[findUserIndex] = { ...mockData[findUserIndex], ...body }; // overwrite the user with the new updated data
    return response.sendStatus(200);
});

// delete Request
usersRouter.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
    const { findUserIndex } = request;
    mockData.splice(findUserIndex, 1);
    return response.sendStatus(200);
});

export default usersRouter;
