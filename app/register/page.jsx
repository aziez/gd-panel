import { getServerSession } from "next-auth";
import RegisterForm from "../components/register/form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return <RegisterForm />;
}
