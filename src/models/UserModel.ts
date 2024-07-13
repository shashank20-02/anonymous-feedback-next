import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    name: string;
    email: string;
    username: string;
    password: string;
}

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: [true, "All fields are required"],
        },
        email: {
            type: String,
            required: [true, "All fields are required"],
            unique: true,
        },
        username: {
            type: String,
            required: [true, "All fields are required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "All fields are required"],
            minlength: 8,
        },
    },
    { timestamps: true }
);

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);
export default UserModel;
