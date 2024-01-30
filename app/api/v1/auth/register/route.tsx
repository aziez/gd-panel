import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log({ email, password }, "BERHASIL MASUK ROUTE");
  } catch (error) {
    console.log(error, "ERROR HANDLER");
  }

  return NextResponse.json({ message: "Succes Login" });
}
