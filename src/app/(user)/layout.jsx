import { auth } from "@/app/auth";

import { redirect } from "next/navigation";

const UserLayout = async ({ children }) => {
  const session = await auth();

  if (!session) return redirect("/");

  return <>{children}</>;
};

export default UserLayout;
