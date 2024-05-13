import { auth } from "@/auth";
import SignupForm from "@/components/setup-form/signup/signup-form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth();

  if (session) {
    redirect("/setup");
  }
  return (
    <main>
      <SignupForm />
    </main>
  );
}
