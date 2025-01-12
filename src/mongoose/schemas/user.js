import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: Schema.Types.String,
    displayName: { type: Schema.Types.String, required: true, unique: true },
    password: { type: Schema.Types.String, required: true },
});

export const User = mongoose.model("User", userSchema);
