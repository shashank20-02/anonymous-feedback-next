import DbConnect from "@/helpers/DbConnect";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    DbConnect();

    try {
        let { name, username, email, password } = await request.json();
        if (
            [username, email, password, name].some(
                (item) => item === undefined || item === ""
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                {
                    status: 404,
                }
            );
        }

        let user = await UserModel.findOne({
            $or: [{ email }, { username }],
        });

        if (user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already Exists !!",
                },
                {
                    status: 401,
                }
            );
        }
        password = await bcrypt.hash(password, 10);
        user = await UserModel.create({
            username,
            email,
            password,
            name,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User registered Successfully !!",
                user,
            },
            {
                status: 404,
            }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            {
                success: false,
                messsage: `Something went Wrong. Error: ${JSON.stringify(err)}`,
            },
            {
                status: 500,
            }
        );
    }
}
