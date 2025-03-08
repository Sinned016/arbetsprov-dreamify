import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (request: Request) => {
  try {
    // Grab the token
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Please login first" }),
        {
          status: 401,
        }
      );
    }

    try {
      // Checking if the token is valid or not
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
      console.log(decodedToken);

      return new NextResponse(
        JSON.stringify({ message: "Valid token", user: decodedToken }),
        {
          status: 200,
        }
      );
    } catch (err: any) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ message: "Error verifying token", err }),
      { status: 500 }
    );
  }
};
