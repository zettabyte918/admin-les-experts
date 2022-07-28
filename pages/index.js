import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const { data } = useSession();

  // redirect admin to his first page
  if (data.user.role.name == "admin") {
    router.push("/stats");
  }
  return null;
};

HomePage.layout = "GlobalLayout";
export default HomePage;
