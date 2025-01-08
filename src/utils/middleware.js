import { mockData } from "./data.js";

// resolve users by ID middleware

export const resolveIndexByUserID = (request, response, next) => {
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
