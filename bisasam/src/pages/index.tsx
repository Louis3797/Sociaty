import { useRouter } from "next/router";
import { useEffect } from "react";
import Dash from "./dash";

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dash");
  });
  return <Dash />;
}

export default Index;
