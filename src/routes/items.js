import { Router } from "express";

import { mockItems } from "../utils/data.js";

const itemsRouter = Router();

// to get list of items
itemsRouter.get("/api/items", (request, response) => {
    console.log(request.headers.cookie);

    console.log(request.signedCookies.hello); // cookies that are signed

    if (request.signedCookies.hello && request.signedCookies.hello === "Express") {
        return response.send(mockItems);
    }
    return response.status(403).send({ msg: "Unauthorized, you need correct cookie!" });
});

export default itemsRouter;
