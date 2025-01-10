import passport from "passport";
import Strategy from "passport-local";
import { mockData } from "../utils/data.js";

passport.serializeUser((user, done) => {
    console.log(`inside serialize users`);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(`inside deserialize users`);
    console.log(`deserialize user id: ${id}`);
    try {
        const findUser = mockData.find((user) => user.id === id);
        if (!findUser) throw new Error("user not found!");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

export default passport.use(
    new Strategy({ usernameField: "displayName", passwordField: "password" }, (username, password, done) => {
        console.log(`username: ${username}, password: ${password}`);
        try {
            const findUser = mockData.find((user) => user.displayName === username);

            if (!findUser) throw new Error("user not found!");
            if (findUser.password !== password) throw new Error("Invalid Credentials");

            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    }),
);
