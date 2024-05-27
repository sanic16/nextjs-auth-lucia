import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";

export default function page({
  searchParams,
}: {
  searchParams: {
    mode: string;
  };
}) {
  const { mode } = searchParams;
  const formMode = mode || "login";

  if (formMode === "login") return <SignIn />;

  return <SignUp />;
}
