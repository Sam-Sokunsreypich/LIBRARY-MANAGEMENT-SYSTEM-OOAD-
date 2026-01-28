import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import AuthForm from "./components/AuthForm";
import Image from "next/image";

export default async function Page() {
  const { data: userSession } = await readUserSession();

  const role = userSession?.session?.user?.user_metadata?.role;

  if(role === "admin"){
    redirect("/admin");
  } else if(role === "staff"){
    redirect("/staff");
  } else if(role === "user"){
    redirect("/user");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Image
      src="/assets/tushu1.jpg"
      alt="Library"
      fill
      className="object-cover"
      priority/>

      <div className="relative z-10"
      ><AuthForm />
      </div>
    </div>
  );
}
