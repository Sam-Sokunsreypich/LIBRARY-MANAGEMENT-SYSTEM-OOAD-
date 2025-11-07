import Link from "next/link";
import AuthForm from "./auth/components/AuthForm";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data: userSession } = await readUserSession();
    
      if (userSession.session) {
        redirect("/admin");
      }
  return (
    
    <div>
      <AuthForm/>
    </div>

  );
}
