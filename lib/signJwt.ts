import jwt from "jsonwebtoken";

export function signJwt(userId: string, username: string, email: string) {
  const signedJwt = jwt.sign(
    { userId, username, email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return signedJwt;
}
