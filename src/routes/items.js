import { Router } from "express";

import { mockItems } from "../utils/data.js";

const itemsRouter = Router();

// to get list of items
itemsRouter.get("/api/items", (request, response) => {
    if (request.signedCookies.hello && request.signedCookies.hello === "Express") {
        return response.send(mockItems);
    }
    return response.status(403).send({ msg: "Unauthorized, you need correct cookie!" });
});

export default itemsRouter;
