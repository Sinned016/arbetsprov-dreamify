import connect from "@/lib/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// What to do.
// get the email and password from request.
// Check if an account with that username exists.
// Hash the password
// if it doesnt exist, create the account? (I think save() does both the checking and creating)
// Return status code 201 and "User created"

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    connect();

    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "A user with that email already exists" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new User({
      ...body,
      password: hashedPassword,
    });

    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User created", user: newUser }),
      { status: 201 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error creating user", err }),
      { status: 500 }
    );
  }
};
