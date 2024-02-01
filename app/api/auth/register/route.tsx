import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import client from "../../../libs/prismadb";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const hashPassword = await hash(password, 10);

    const user = await client.user.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
      },
    });

    console.log({ email, password, user }, "BERHASIL MASUK ROUTE");
  } catch (error) {
    console.log(error, "ERROR HANDLER");
  }

  return NextResponse.json({ message: "Succes Create User" });
}
