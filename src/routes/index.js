import { Router } from "express";

import usersRouter from "./users.js";
import itemsRouter from "./items.js";

const mainRouter = Router();

mainRouter.use(usersRouter);
mainRouter.use(itemsRouter);

export default mainRouter;
