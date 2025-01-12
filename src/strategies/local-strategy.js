import passport from "passport";
import Strategy from "passport-local";

import { mockData } from "../utils/data.js";
import { User } from "../mongoose/schemas/user.js";

passport.serializeUser((user, done) => {
    console.log(`inside serialize users`);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log(`inside deserialize users`);
    console.log(`deserialize user id: ${id}`);
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("user not found!");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "displayName", passwordField: "password" }, async (username, password, done) => {
        try {
            // const findUser = mockData.find((user) => user.displayName === username);
            // if (!findUser) throw new Error("user not found!");
            // if (findUser.password !== password) throw new Error("Invalid Credentials");
            // done(null, findUser);

            const findUser = await User.findOne({ displayName: username });
            if (!findUser) throw new Error("user not found!");
            if (findUser.password !== password) throw new Error("Invalid Credentials");
            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    }),
);
