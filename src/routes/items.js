import { Router } from "express";

import { mockItems } from "../utils/data.js";

const itemsRouter = Router();

// to get list of items
itemsRouter.get("/api/items", (request, response) => {
    response.send(mockItems);
});

export default itemsRouter;
