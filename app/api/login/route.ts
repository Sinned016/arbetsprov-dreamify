import connect from "@/lib/db";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signJwt } from "@/lib/signJwt";

// What to do list.
// grab the email and the password from request.
// check if email exists in my database.
// check if the passwords are a match with bcrypt.compare
// if account exists, create a jwtToken with the users ID, username and mail.
// set the token either in here or on the client (Not sure what the best way is yet.)

export const POST = async (request: Request) => {
  try {
    const body = await request.json(); // Email and password
    connect();

    const existingUser = await User.findOne({ email: body.email });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: "Invalid Email" }), {
        status: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: "Invalid Password" }), {
        status: 401,
      });
    }

    // Generating JWT TOKEN
    const token = signJwt(existingUser._id, existingUser.username, body.email);

    return new NextResponse(
      JSON.stringify({ message: "Login successful", token: token }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error logging in", err }),
      { status: 500 }
    );
  }
};
